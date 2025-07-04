/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adapterTest from "../adapterTest.js";
import type * as lib from "../lib.js";
import type * as util from "../util.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  adapterTest: typeof adapterTest;
  lib: typeof lib;
  util: typeof util;
}>;
export type Mounts = {
  adapterTest: {
    count: FunctionReference<"query", "public", any, any>;
    create: FunctionReference<"mutation", "public", any, any>;
    delete: FunctionReference<"mutation", "public", any, any>;
    deleteMany: FunctionReference<"mutation", "public", any, any>;
    findMany: FunctionReference<"query", "public", any, any>;
    findOne: FunctionReference<"query", "public", any, any>;
    isAuthenticated: FunctionReference<"query", "public", {}, any>;
    update: FunctionReference<"mutation", "public", any, any>;
    updateMany: FunctionReference<"mutation", "public", any, any>;
  };
  lib: {
    create: FunctionReference<
      "mutation",
      "public",
      {
        input:
          | {
              data: {
                createdAt: number;
                displayUsername?: string;
                email: string;
                emailVerified: boolean;
                image?: string;
                isAnonymous?: boolean;
                name: string;
                twoFactorEnabled?: boolean;
                updatedAt: number;
                userId?: string;
                username?: string;
              };
              model: "user";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              data: {
                createdAt: number;
                expiresAt: number;
                ipAddress?: string;
                token: string;
                updatedAt: number;
                userAgent?: string;
                userId: string;
              };
              model: "session";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              data: {
                accessToken?: string;
                accessTokenExpiresAt?: number;
                accountId: string;
                createdAt: number;
                idToken?: string;
                password?: string;
                providerId: string;
                refreshToken?: string;
                refreshTokenExpiresAt?: number;
                scope?: string;
                updatedAt: number;
                userId: string;
              };
              model: "account";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              data: {
                createdAt?: number;
                expiresAt: number;
                identifier: string;
                updatedAt?: number;
                value: string;
              };
              model: "verification";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              data: { backupCodes: string; secret: string; userId: string };
              model: "twoFactor";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              data: {
                createdAt: number;
                privateKey: string;
                publicKey: string;
              };
              model: "jwks";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              data: { count?: number; key?: string; lastRequest?: number };
              model: "rateLimit";
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            };
      },
      any
    >;
    deleteIn: FunctionReference<
      "mutation",
      "public",
      { input: { field: "token"; table: "session"; values: Array<string> } },
      any
    >;
    deleteMany: FunctionReference<
      "mutation",
      "public",
      {
        limit?: number;
        model: string;
        paginationOpts: {
          cursor: string | null;
          endCursor?: string | null;
          id?: number;
          maximumBytesRead?: number;
          maximumRowsRead?: number;
          numItems: number;
        };
        select?: Array<string>;
        sortBy?: { direction: "asc" | "desc"; field: string };
        unique?: boolean;
        where?: Array<{
          connector?: "AND" | "OR";
          field: string;
          operator?:
            | "lt"
            | "lte"
            | "gt"
            | "gte"
            | "eq"
            | "in"
            | "ne"
            | "contains"
            | "starts_with"
            | "ends_with";
          value:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>
            | null;
        }>;
      },
      any
    >;
    deleteOne: FunctionReference<
      "mutation",
      "public",
      {
        limit?: number;
        model: string;
        select?: Array<string>;
        sortBy?: { direction: "asc" | "desc"; field: string };
        unique?: boolean;
        where?: Array<{
          connector?: "AND" | "OR";
          field: string;
          operator?:
            | "lt"
            | "lte"
            | "gt"
            | "gte"
            | "eq"
            | "in"
            | "ne"
            | "contains"
            | "starts_with"
            | "ends_with";
          value:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>
            | null;
        }>;
      },
      any
    >;
    findMany: FunctionReference<
      "query",
      "public",
      {
        limit?: number;
        model: string;
        paginationOpts: {
          cursor: string | null;
          endCursor?: string | null;
          id?: number;
          maximumBytesRead?: number;
          maximumRowsRead?: number;
          numItems: number;
        };
        select?: Array<string>;
        sortBy?: { direction: "asc" | "desc"; field: string };
        unique?: boolean;
        where?: Array<{
          connector?: "AND" | "OR";
          field: string;
          operator?:
            | "lt"
            | "lte"
            | "gt"
            | "gte"
            | "eq"
            | "in"
            | "ne"
            | "contains"
            | "starts_with"
            | "ends_with";
          value:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>
            | null;
        }>;
      },
      any
    >;
    findOne: FunctionReference<
      "query",
      "public",
      {
        limit?: number;
        model: string;
        select?: Array<string>;
        sortBy?: { direction: "asc" | "desc"; field: string };
        unique?: boolean;
        where?: Array<{
          connector?: "AND" | "OR";
          field: string;
          operator?:
            | "lt"
            | "lte"
            | "gt"
            | "gte"
            | "eq"
            | "in"
            | "ne"
            | "contains"
            | "starts_with"
            | "ends_with";
          value:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>
            | null;
        }>;
      },
      any
    >;
    getCurrentSession: FunctionReference<"query", "public", {}, any>;
    getIn: FunctionReference<
      "query",
      "public",
      {
        limit?: number;
        model: string;
        select?: Array<string>;
        sortBy?: { direction: "asc" | "desc"; field: string };
        unique?: boolean;
        where?: Array<{
          connector?: "AND" | "OR";
          field: string;
          operator?:
            | "lt"
            | "lte"
            | "gt"
            | "gte"
            | "eq"
            | "in"
            | "ne"
            | "contains"
            | "starts_with"
            | "ends_with";
          value:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>
            | null;
        }>;
      },
      any
    >;
    updateMany: FunctionReference<
      "mutation",
      "public",
      {
        limit?: number;
        model: string;
        paginationOpts: {
          cursor: string | null;
          endCursor?: string | null;
          id?: number;
          maximumBytesRead?: number;
          maximumRowsRead?: number;
          numItems: number;
        };
        select?: Array<string>;
        sortBy?: { direction: "asc" | "desc"; field: string };
        unique?: boolean;
        update?: {
          createdAt?: number;
          displayUsername?: string;
          email?: string;
          emailVerified?: boolean;
          image?: string;
          isAnonymous?: boolean;
          name?: string;
          twoFactorEnabled?: boolean;
          updatedAt?: number;
          userId?: string;
          username?: string;
        };
        where?: Array<{
          connector?: "AND" | "OR";
          field: string;
          operator?:
            | "lt"
            | "lte"
            | "gt"
            | "gte"
            | "eq"
            | "in"
            | "ne"
            | "contains"
            | "starts_with"
            | "ends_with";
          value:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>
            | null;
        }>;
      },
      any
    >;
    updateOne: FunctionReference<
      "mutation",
      "public",
      {
        input:
          | {
              model: "user";
              update: {
                createdAt?: number;
                displayUsername?: string;
                email?: string;
                emailVerified?: boolean;
                image?: string;
                isAnonymous?: boolean;
                name?: string;
                twoFactorEnabled?: boolean;
                updatedAt?: number;
                userId?: string;
                username?: string;
              };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              model: "session";
              update: {
                createdAt?: number;
                expiresAt?: number;
                ipAddress?: string;
                token?: string;
                updatedAt?: number;
                userAgent?: string;
                userId?: string;
              };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              model: "account";
              update: {
                accessToken?: string;
                accessTokenExpiresAt?: number;
                accountId?: string;
                createdAt?: number;
                idToken?: string;
                password?: string;
                providerId?: string;
                refreshToken?: string;
                refreshTokenExpiresAt?: number;
                scope?: string;
                updatedAt?: number;
                userId?: string;
              };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              model: "verification";
              update: {
                createdAt?: number;
                expiresAt?: number;
                identifier?: string;
                updatedAt?: number;
                value?: string;
              };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              model: "twoFactor";
              update: {
                backupCodes?: string;
                secret?: string;
                userId?: string;
              };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              model: "jwks";
              update: {
                createdAt?: number;
                privateKey?: string;
                publicKey?: string;
              };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            }
          | {
              model: "rateLimit";
              update: { count?: number; key?: string; lastRequest?: number };
              where?: Array<{
                connector?: "AND" | "OR";
                field: string;
                operator?:
                  | "lt"
                  | "lte"
                  | "gt"
                  | "gte"
                  | "eq"
                  | "in"
                  | "ne"
                  | "contains"
                  | "starts_with"
                  | "ends_with";
                value:
                  | string
                  | number
                  | boolean
                  | Array<string>
                  | Array<number>
                  | null;
              }>;
            };
      },
      any
    >;
  };
};
// For now fullApiWithMounts is only fullApi which provides
// jump-to-definition in component client code.
// Use Mounts for the same type without the inference.
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
