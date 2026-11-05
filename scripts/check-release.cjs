const assert = require('node:assert/strict')
const { readFileSync, appendFileSync } = require('node:fs')

function releaseChannel({ version, tag, prerelease }) {
  assert.equal(tag, `v${version}`, 'Release tag must match the package version')
  assert.equal(typeof prerelease, 'boolean', 'Release must declare its prerelease status')
  const isPrerelease = version.split('+')[0].includes('-')
  assert.equal(prerelease, isPrerelease,
    'GitHub prerelease status must match the package version')
  return isPrerelease ? 'next' : 'latest'
}

if (require.main === module) {
  const { release } = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
  const channel = releaseChannel({
    version: require('../package.json').version,
    tag: release.tag_name,
    prerelease: release.prerelease,
  })
  appendFileSync(process.env.GITHUB_OUTPUT, `dist_tag=${channel}\n`)
  console.log(`Validated ${release.tag_name} for npm tag ${channel}`)
}

module.exports = { releaseChannel }
