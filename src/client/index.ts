import {
  type Auth as ConvexAuth,
  type DefaultFunctionArgs,
  type Expand,
  type FunctionReference,
  GenericActionCtx,
  type GenericDataModel,
  GenericMutationCtx,
  type GenericQueryCtx,
  type HttpRouter,
  httpActionGeneric,
  internalMutationGeneric,
  queryGeneric,
} from "convex/server";
import { type GenericId, Infer, v } from "convex/values";
import type { api } from "../component/_generated/api";
import schema from "../component/schema";
import { convexAdapter } from "./adapter";
import { betterAuth } from "better-auth";
import { omit } from "convex-helpers";
import { createCookieGetter } from "better-auth/cookies";
import { fetchQuery } from "convex/nextjs";
import { JWT_COOKIE_NAME } from "../plugins/convex";
import { requireEnv } from "../utils";
import { partial } from "convex-helpers/validators";
import { adapterArgsValidator, adapterWhereValidator } from "../component/lib";
import { corsRouter } from "convex-helpers/server/cors";
export { convexAdapter };

const createUserFields = omit(schema.tables.user.validator.fields, ["userId"]);
const createUserValidator = v.object(createUserFields);
const createUserArgsValidator = v.object({
  input: v.object({
    model: v.literal("user"),
    data: v.object(createUserFields),
  }),
});
const updateUserArgsValidator = v.object({
  input: v.object({
    model: v.literal("user"),
    where: v.optional(v.array(adapterWhereValidator)),
    update: v.object(partial(createUserFields)),
  }),
});
const createSessionArgsValidator = v.object({
  input: v.object({
    model: v.literal("session"),
    data: v.object(schema.tables.session.validator.fields),
  }),
});

export type EventFunction<T extends DefaultFunctionArgs> = FunctionReference<
  "mutation",
  "internal" | "public",
  T
>;

export type AuthFunctions = {
  createUser: FunctionReference<
    "mutation",
    "internal",
    Infer<typeof createUserArgsValidator>
  >;
  deleteUser: FunctionReference<
    "mutation",
    "internal",
    Infer<typeof adapterArgsValidator>
  >;
  updateUser: FunctionReference<
    "mutation",
    "internal",
    Infer<typeof updateUserArgsValidator>
  >;
  createSession: FunctionReference<
    "mutation",
    "internal",
    Infer<typeof createSessionArgsValidator>
  >;
};

export type PublicAuthFunctions = {
  isAuthenticated: FunctionReference<"query", "public">;
};

export class BetterAuth<UserId extends string = string> {
  constructor(
    public component: UseApi<typeof api>,
    public config: {
      authFunctions: AuthFunctions;
      publicAuthFunctions?: PublicAuthFunctions;
      verbose?: boolean;
    }
  ) {}

  async isAuthenticated(token?: string | null) {
    if (!this.config.publicAuthFunctions?.isAuthenticated) {
      throw new Error(
        "isAuthenticated function not found. It must be a named export in convex/auth.ts"
      );
    }
    return fetchQuery(
      this.config.publicAuthFunctions.isAuthenticated,
      {},
      { token: token ?? undefined }
    );
  }

  async getHeaders(ctx: RunQueryCtx & { auth: ConvexAuth }) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Headers();
    }
    const session = await ctx.runQuery(this.component.lib.getCurrentSession);
    return new Headers({
      authorization: `Bearer ${session?.token}`,
    });
  }

  // TODO: use the proper id type for auth functions
  async getAuthUserId(ctx: RunQueryCtx & { auth: ConvexAuth }) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return identity.subject as UserId;
  }

  // Convenience function for getting the Better Auth user
  async getAuthUser(ctx: RunQueryCtx & { auth: ConvexAuth }) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    const doc = await ctx.runQuery(this.component.lib.findOne, {
      model: "user",
      where: [
        {
          field: "userId",
          value: identity.subject,
        },
      ],
    });
    if (!doc) {
      return null;
    }
    // Type narrowing
    if (!("emailVerified" in doc)) {
      throw new Error("invalid user");
    }
    const { id: _id, ...user } = doc;
    return user;
  }

  async getIdTokenCookieName(
    createAuth: (ctx: GenericActionCtx<any>) => ReturnType<typeof betterAuth>
  ) {
    const auth = createAuth({} as any);
    const createCookie = createCookieGetter(auth.options);
    const cookie = createCookie(JWT_COOKIE_NAME);
    return cookie.name;
  }

  createAuthFunctions<DataModel extends GenericDataModel>(opts: {
    onCreateUser: (
      ctx: GenericMutationCtx<DataModel>,
      user: Infer<typeof createUserValidator>
    ) => Promise<UserId>;
    onDeleteUser?: (
      ctx: GenericMutationCtx<DataModel>,
      id: UserId
    ) => void | Promise<void>;
    onUpdateUser?: (
      ctx: GenericMutationCtx<DataModel>,
      user: Infer<typeof schema.tables.user.validator>
    ) => void | Promise<void>;
    onCreateSession?: (
      ctx: GenericMutationCtx<DataModel>,
      session: Infer<typeof schema.tables.session.validator>
    ) => void | Promise<void>;
  }) {
    return {
      isAuthenticated: queryGeneric({
        args: v.object({}),
        handler: async (ctx) => {
          const identity = await ctx.auth.getUserIdentity();
          return identity !== null;
        },
      }),
      createUser: internalMutationGeneric({
        args: createUserArgsValidator,
        handler: async (ctx, args) => {
          const userId = await opts.onCreateUser(ctx, args.input.data);
          return ctx.runMutation(this.component.lib.create, {
            input: {
              ...args.input,
              data: { ...args.input.data, userId },
            },
          });
        },
      }),
      deleteUser: internalMutationGeneric({
        args: adapterArgsValidator,
        handler: async (ctx, args) => {
          const doc = await ctx.runMutation(this.component.lib.deleteOne, args);
          if (doc && opts.onDeleteUser) {
            await opts.onDeleteUser(ctx, doc.userId as UserId);
          }
          return doc;
        },
      }),
      updateUser: internalMutationGeneric({
        args: updateUserArgsValidator,
        handler: async (ctx, args) => {
          const updatedUser = await ctx.runMutation(
            this.component.lib.updateOne,
            { input: args.input }
          );
          // Type narrowing
          if (!("emailVerified" in updatedUser)) {
            throw new Error("invalid user");
          }
          if (opts.onUpdateUser) {
            await opts.onUpdateUser(ctx, omit(updatedUser, ["_id"]));
          }
          return updatedUser;
        },
      }),
      createSession: internalMutationGeneric({
        args: createSessionArgsValidator,
        handler: async (ctx, args) => {
          const session = await ctx.runMutation(this.component.lib.create, {
            input: args.input,
          });
          await opts.onCreateSession?.(ctx, session);
          return session;
        },
      }),
    };
  }

  registerRoutes(
    http: HttpRouter,
    createAuth: (ctx: GenericActionCtx<any>) => ReturnType<typeof betterAuth>,
    opts = { cors: false }
  ) {
    const betterAuthOptions = createAuth({} as any).options;
    const path = betterAuthOptions.basePath ?? "/api/auth";
    const authRequestHandler = httpActionGeneric(async (ctx, request) => {
      if (this.config.verbose) {
        console.log("options.baseURL", betterAuthOptions.baseURL);
        console.log("request headers", request.headers);
      }
      const auth = createAuth(ctx);
      const response = await auth.handler(request);
      if (this.config?.verbose) {
        console.log("response headers", response.headers);
      }
      return response;
    });

    const wellKnown = http.lookup("/.well-known/openid-configuration", "GET");

    // If registerRoutes is used multiple times, this may already be defined
    if (!wellKnown) {
      // Redirect root well-known to api well-known
      http.route({
        path: "/.well-known/openid-configuration",
        method: "GET",
        handler: httpActionGeneric(async () => {
          const url = `${requireEnv("CONVEX_SITE_URL")}/api/auth/convex/.well-known/openid-configuration`;
          return Response.redirect(url);
        }),
      });
    }

    if (!opts.cors) {
      http.route({
        pathPrefix: `${path}/`,
        method: "GET",
        handler: authRequestHandler,
      });

      http.route({
        pathPrefix: `${path}/`,
        method: "POST",
        handler: authRequestHandler,
      });

      return;
    }
    const cors = corsRouter(http, {
      allowedOrigins: async (request) => {
        const trustedOriginsOption =
          (await createAuth({} as any).$context).options.trustedOrigins ?? [];
        const trustedOrigins = Array.isArray(trustedOriginsOption)
          ? trustedOriginsOption
          : await trustedOriginsOption(request);
        return trustedOrigins.map((origin) =>
          // Strip trailing wildcards, unsupported for allowedOrigins
          origin.endsWith("*") && origin.length > 1
            ? origin.slice(0, -1)
            : origin
        );
      },
      allowCredentials: true,
      allowedHeaders: ["Content-Type", "Better-Auth-Cookie"],
      exposedHeaders: ["Set-Better-Auth-Cookie"],
      debug: this.config?.verbose,
      enforceAllowOrigins: false,
    });

    cors.route({
      pathPrefix: `${path}/`,
      method: "GET",
      handler: authRequestHandler,
    });

    cors.route({
      pathPrefix: `${path}/`,
      method: "POST",
      handler: authRequestHandler,
    });
  }
}

/* Type utils follow */

type RunQueryCtx = {
  runQuery: GenericQueryCtx<GenericDataModel>["runQuery"];
};

export type OpaqueIds<T> =
  T extends GenericId<infer _T>
    ? string
    : T extends (infer U)[]
      ? OpaqueIds<U>[]
      : T extends ArrayBuffer
        ? ArrayBuffer
        : T extends object
          ? { [K in keyof T]: OpaqueIds<T[K]> }
          : T;

export type UseApi<API> = Expand<{
  [mod in keyof API]: API[mod] extends FunctionReference<
    infer FType,
    "public",
    infer FArgs,
    infer FReturnType,
    infer FComponentPath
  >
    ? FunctionReference<
        FType,
        "internal",
        OpaqueIds<FArgs>,
        OpaqueIds<FReturnType>,
        FComponentPath
      >
    : UseApi<API[mod]>;
}>;
