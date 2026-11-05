# Contributing to Fude

Keep the library small, preserve its public behaviour, and justify additions by a concrete need.

## Get started

Use Node.js 26 and install the locked development dependencies:

```sh
nvm use
npm ci
npm run test:package
```

The package and CI support maintained LTS lines only: Node 22, 24 and 26. CI also checks Windows on Node 26. Update the engine range, matrix, `.nvmrc` and README when the supported lines change. Removing support for an existing runtime requires a major release. Fude 5 dropped support for older Node.js lines.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run check` | Check TypeScript without writing output. |
| `npm run build` | Clean `dist`, compile TypeScript and minify JavaScript. |
| `npm test` | Test the existing `dist` build with Node's test runner. |
| `npm test -- --watch` | Watch tests; rebuild separately after source changes. |
| `npm run verify` | Build and test the minified library. |
| `npm run test:package` | Verify, pack and test an isolated package consumer. |
| `npm run test:coverage` | Build readable JavaScript and report native coverage. |
| `npm run clean` | Remove generated output. |

Tests read `dist`, so rebuild after editing `src/index.ts`. Coverage leaves readable output in `dist`; run the normal build again to restore minified output. Generated files are ignored and should not be committed.

`test:package` verifies the build, packs it without rebuilding, then installs the tarball in a temporary consumer. It checks the package contents, CommonJS and native ESM imports, TypeScript declarations, and representative formatting behaviour. The consumer has no development dependencies; the repository's compiler checks its TypeScript example.

## What the tests protect

Test public behaviour and demonstrated regressions. The suite covers colour detection and override precedence, stream-specific instances, colour levels, ANSI mappings and aliases, nesting, optional reset restoration, large inputs, and the documented template-helper integration. Package checks cover the consumer boundary. Separate tests protect CI's decision to reuse or rerun checks.

Add a test when it distinguishes a meaningful failure. A coverage percentage is diagnostic, not a target; an extra input alone does not justify another test.

## Dependencies and style

Fude has no runtime dependencies. Four direct development dependencies remain:

| Dependency | Job |
| --- | --- |
| TypeScript | Compile the source, generate declarations and check types. |
| `@types/node` | Check use of Node APIs. |
| Terser | Reduce the JavaScript shipped to consumers. |
| `colorize-template` | Test the optional integration documented in the README. |

Node provides testing, assertions, coverage and filesystem cleanup. There are no commit hooks, commit-message rules, lint plugins or mandatory formatter. Follow the surrounding style and keep the diff focused.

If an older checkout still points at Husky's hooks, remove that local setting once:

```sh
git config --local --unset core.hooksPath
```

## CI and repository settings

`Node.js CI` runs on pull requests to `main`, pushes to `main`, and manual dispatch. The **CI passed** check aggregates the matrix, including package checks and coverage.

Protection for `main` requires **CI passed** and up-to-date branches. Keep the aggregate as the required check when changing the runtime matrix.

After a PR merge, the push workflow checks whether a successful PR run verified the exact Git tree now on `main`. If it did, the matrix is skipped. Changed merge trees, direct pushes without matching PR proof, bypassed checks, missing results and API failures run the checks. Independent workflows are unaffected.

Dependabot groups npm and Actions updates. This pipeline does not add CodeQL or external coverage uploads.

## Releases

1. Select the version and update `package.json` and `package-lock.json`. Respect breaking changes, including runtime support changes.
2. Run `npm ci` and `npm run test:package`, then merge the release changes through a passing PR.
3. Create a GitHub release with a tag exactly matching `v<package version>`.

Publishing that release runs `npm-publish.yml`. It requires the tagged commit to be on `main` and checks that the tag, package version and GitHub prerelease flag agree. It builds and tests the minified library, then validates the npm tarball in an isolated consumer and publishes that same tarball with provenance. Stable releases use `latest`; versions such as `5.0.0-rc.1` must be GitHub prereleases and use `next`. Publication runs are serialized.

Local `npm pack` and `npm publish` invoke `prepack`, which builds and tests the library. The release workflow adds the isolated-consumer check. Tests do not publish anything. No workflow creates releases automatically.

GitHub Packages publication is not configured; it would require a separate scoped package name.

### npm authentication

The GitHub Actions trusted publisher is configured on npmjs for `fude`. Its settings must match the release workflow:

| Field | Value |
| --- | --- |
| Owner | `msanguineti` |
| Repository | `fude` |
| Workflow filename | `npm-publish.yml` |
| Environment | Leave unset; the workflow does not select one. |
| Direct publishing | Allow `npm publish`. |

The connection uses OpenID Connect, so the release workflow can authenticate without a stored npm token. If you replace the connection, follow any first-publication validation deadline shown in npm's package settings.

The workflow uses trusted publishing only; it does not read an npm write token. An obsolete `npm_token` repository secret, if still present, is unused. Package token-access restrictions are configured separately on npmjs. See [npm's trusted-publishing documentation](https://docs.npmjs.com/trusted-publishers/).
