const { test } = require('node:test')
const assert = require('node:assert/strict')
const { releaseChannel } = require('../scripts/check-release.cjs')

test('release candidates publish to next', () => {
  assert.equal(releaseChannel({ version: '5.0.0-rc.1', tag: 'v5.0.0-rc.1', prerelease: true }), 'next')
})
test('stable releases publish to latest', () => {
  assert.equal(releaseChannel({ version: '5.0.0', tag: 'v5.0.0', prerelease: false }), 'latest')
})
test('a release candidate cannot be published as a stable release', () => {
  assert.throws(() => releaseChannel({ version: '5.0.0-rc.1', tag: 'v5.0.0-rc.1', prerelease: false }), /prerelease status/)
})
test('stable versions cannot be marked as prereleases', () => {
  assert.throws(() => releaseChannel({ version: '5.0.0', tag: 'v5.0.0', prerelease: true }), /prerelease status/)
})
test('the GitHub tag must exactly match the package version', () => {
  assert.throws(() => releaseChannel({ version: '5.0.0-rc.1', tag: 'v5.0.0', prerelease: true }), /tag must match/)
})
test('a hyphen in build metadata does not make a stable version a prerelease', () => {
  assert.equal(releaseChannel({ version: '5.0.0+build-sha', tag: 'v5.0.0+build-sha', prerelease: false }), 'latest')
})
