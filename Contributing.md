# Contributing

Use Node.js 26 (`nvm use`) and install the locked development dependencies:

```sh
npm ci
npm run test:package
```

`test:package` builds and minifies the library, runs the native Node test suite,
then installs the tarball in a temporary consumer and checks CommonJS, native ESM
and TypeScript imports. The temporary consumer has no development dependencies.

For a quicker edit cycle:

```sh
npm run check
npm run build
npm test
npm test -- --watch
```

Rebuild after changing `src/index.ts`; tests use `dist`. Native coverage runs the
readable, unminified build so its line report is useful:

```sh
npm run test:coverage
```

Tests should protect public behaviour or a demonstrated regression. Cover colour
detection and overrides, ANSI nesting and resets, supported colour levels, and
consumer imports. A coverage percentage is diagnostic, not a target.

## Dependencies and style

The library has no runtime dependencies. Its four direct development dependencies
have specific jobs: TypeScript compiles and checks the source, `@types/node` checks
Node API usage, Terser reduces shipped code, and `colorize-template` tests the
documented optional integration. Node provides tests, assertions, coverage and
filesystem cleanup. There are no Git hooks, commit-message rules, lint plugins or
mandatory formatter. Follow the surrounding style and keep changes focused.

If an existing checkout still has Husky's local hook setting, remove it once:

```sh
git config --local --unset core.hooksPath
```

Do not commit generated files or change the version unless preparing a release.

## CI and releases

CI and the package's engine range support maintained LTS releases only: Node 22,
24 and 26, plus Windows on Node 26. Dropping older runtimes requires a major
release. Update the matrix and engine range when LTS maintenance changes.
Contributor tooling uses Node 26. Set the required
branch check to **CI passed**; it aggregates the matrix instead of depending on
individual version names. Require branches to be up to date before merging so
the tested merge tree matches `main`.

On a push to `main`, CI reuses a successful PR run only if its verification marker
matches the exact Git tree now on `main`. Direct pushes, admin bypasses, changed
merge trees, missing results and API failures run the checks. Other independent
workflows are unaffected. This pipeline does not add CodeQL or external coverage uploads.
Dependabot groups updates into npm and Actions PRs.

Publishing a GitHub release with tag `v<package version>` validates and publishes
the exact tested npm tarball. Pre-releases use npm's `next` tag. GitHub Packages
publication is not configured: it requires a separate scoped package name.

The workflow supports npm trusted publishing. In npm's `fude` package settings,
configure GitHub Actions with owner `msanguineti`, repository `fude`, and workflow
filename `npm-publish.yml`, allowing direct publication. Until that is configured,
the existing `npm_token` repository secret remains the fallback. After verifying
trusted publishing, remove that write token. No release is created automatically.
