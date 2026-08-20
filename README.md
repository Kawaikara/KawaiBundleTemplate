# Kawai Bundle Template

This repository is a GitHub Template for a Kawaikara `.kawai` Bundle. The
example opens Google with one TypeScript Provider and contributes three
PluginView panels: one from the Provider and two from its Provider-scoped
Plugin. Kawaikara shows a browser-like panel bar only because more than one
panel exists; a single contribution fills the area without that bar.

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
to the immutable `v1.0.0` GitHub Release in `Kawaikara/kawai-site-api`. A fresh clone can therefore
run `pnpm install` without a sibling Kawaikara checkout, a local `link:` path,
or a build of the desktop monorepo.

Kawaikara releases the API independently of the desktop app. A matching
`vX.Y.Z` tag in [`Kawaikara/kawai-site-api`](https://github.com/Kawaikara/kawai-site-api)
builds the package and publishes a tested `.tgz` on that dedicated repository's
GitHub Releases page. The Git tag identifies the immutable API source and the
release artifact is the installable package. Keep the Bundle
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

Panel titles are presentation text and may repeat. Kawaikara selects a panel by
the stable combination of its Provider or Plugin owner id and local panel id.
HTML panels run in a sandboxed document without Kawaikara IPC or access to the
overlay document.

Site-specific Inject code belongs beside its Provider. The app supplies only
generic primitives such as viewer lifecycle, settings, shortcuts, sessions,
and unified PiP.
