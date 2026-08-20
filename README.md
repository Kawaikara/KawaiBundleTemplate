# Kawai Bundle Template

This repository is a GitHub Template for a Kawaikara `.kawai` Bundle. The
example contains one TypeScript Provider and one Provider-scoped TypeScript
Plugin.

```bash
pnpm install
pnpm typecheck
pnpm build
```

The finished archive is written to `release/*.kawai`. A `.kawai` file is a ZIP
container, but Kawaikara accepts only the application-specific extension.

## API dependency

Bundle projects consume the public `@kawaikara/site-api` package. Kawaikara
publishes it independently of the desktop app and keeps `apiVersion` compatible
with the manifest. During local development against an unpublished checkout,
replace the dependency temporarily with an absolute `link:` path.

The desktop repository publishes this package through its `Publish Site API`
workflow (an npm `NPM_TOKEN` is required). Publish the API before using this
template from a remote repository; Git cannot depend directly on only the
`packages/site-api` subdirectory of the Kawaikara monorepo.

## Plugin scope

The included Plugin lives below its Provider and therefore attaches only to
that Provider. Bundle-level Plugins can target one or many Providers through
`providerIds`. Plugin-only and App-attached Bundles are intentionally not part
of Site API v1; an App Plugin needs a separate, narrower App context and
permission model before it can be enabled safely.

Site-specific Inject code belongs beside its Provider. The app supplies only
generic primitives such as viewer lifecycle, settings, shortcuts, sessions,
and unified PiP.
