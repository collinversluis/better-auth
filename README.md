# Convex + Better Auth

[![npm version](https://badge.fury.io/js/@convex-dev%2Fbetter-auth.svg)](https://badge.fury.io/js/@convex-dev/better-auth)

<!-- START: Include on https://convex.dev/components -->

Use [Better Auth](https://better-auth.com) with [Convex](https://www.convex.dev)
🔥

> [!IMPORTANT]
> The Convex Better Auth component is in early alpha development.

> If your use case isn't supported, a plugin doesn't work, you hit a bug, etc, please open a GitHub issue or reach out on [Discord](https://discord.gg/convex).

**Full documentation and guides:**
👉 [convex-better-auth.netlify.app](https://convex-better-auth.netlify.app)

### Running examples

**Note:** The examples are not starters - the dependencies are set up to work
locally within this repo. They can be adapted for standalone use, but are
intentionally not set up for it.

**Note:** Examples on the `main` branch use the `alpha` release. If you're not
installing the `alpha`, use the `latest` branch for docs and examples matching
the latest stable release.

1. Clone or fork the repo
2. Install root dependencies

```bash
npm install
```

3. Change to one of the example directories and install dependencies

```bash
cd examples/<example-name>
npm install
```

4. If you haven't run this example before, initialize the database

```bash
npx convex dev --once
```

5. Run the example

```bash
npm run dev
```

If you're making changes to the component, open a separate terminal
and run the build watch task

```bash
npm run build:watch
```

<!-- END: Include on https://convex.dev/components -->
