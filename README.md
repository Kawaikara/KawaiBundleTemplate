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

Bundle projects import `@kawaikara/site-api`, but the package is not currently
published to the npm registry. This template pins the prebuilt package attached
to the immutable `site-api-v1.0.0` GitHub Release. A fresh clone can therefore
run `pnpm install` without a sibling Kawaikara checkout, a local `link:` path,
or a build of the desktop monorepo.

Kawaikara releases the API independently of the desktop app. A matching
`site-api-vX.Y.Z` tag builds the package and publishes a tested `.tgz` on the
source repository's GitHub Releases page. The Git tag identifies the immutable
source and the release artifact is the installable package. Keep the Bundle
manifest's `apiVersion` compatible with the selected Site API release.

When developing both repositories locally, you may temporarily replace the Git
dependency with an absolute `link:` path to `packages/site-api`. Do not commit
that machine-specific path.

## Plugin scope

The included Plugin lives below its Provider and therefore attaches only to
that Provider. Bundle-level Plugins can target one or many Providers through
`providerIds`. Plugin-only and App-attached Bundles are intentionally not part
of Site API v1; an App Plugin needs a separate, narrower App context and
permission model before it can be enabled safely.

Site-specific Inject code belongs beside its Provider. The app supplies only
generic primitives such as viewer lifecycle, settings, shortcuts, sessions,
and unified PiP.
