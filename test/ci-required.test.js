const { test } = require('node:test')
const assert = require('node:assert/strict')
const { checksRequired } = require('../scripts/ci-required.cjs')

const input = { event: 'push', repository: 'owner/repo', sha: 'merged', tree: 'tested', token: 'test' }
const pr = { merged_at: 'date', merge_commit_sha: 'merged', base: { ref: 'main' }, head: { sha: 'head' } }
const run = { id: 1, conclusion: 'success' }
const job = { name: 'CI passed', conclusion: 'success', steps: [{ name: 'Verified tree tested', conclusion: 'success' }] }
function request(responses) {
  let index = 0
  return async () => {
    assert.ok(index < responses.length, 'Unexpected API request')
    const data = responses[index++]
    return { ok: true, json: async () => data }
  }
}

test('PRs and manual runs always execute checks without querying previous results', async () => {
  for (const event of ['pull_request', 'workflow_dispatch']) {
    assert.equal(await checksRequired({ ...input, event, request: () => { throw new Error('Unexpected API request') } }), true)
  }
})
test('direct pushes and admin bypass commits run checks', async () => {
  assert.equal(await checksRequired({ ...input, request: request([[]]) }), true)
})
test('association with an unmerged PR cannot skip checks', async () => {
  assert.equal(await checksRequired({ ...input, request: request([[{ ...pr, merged_at: null }]]) }), true)
})
test('only a merged PR for this commit on main can reuse checks', async () => {
  for (const other of [{ ...pr, merge_commit_sha: 'other' }, { ...pr, base: { ref: 'other' } }]) {
    assert.equal(await checksRequired({ ...input, request: request([[other]]) }), true)
  }
})
test('a successful PR run verifying the identical tree skips duplicate checks', async () => {
  assert.equal(await checksRequired({ ...input, request: request([[pr], { workflow_runs: [run] }, { jobs: [job] }]) }), false)
})
test('changed merge trees run checks even when the PR passed', async () => {
  assert.equal(await checksRequired({ ...input, tree: 'changed', request: request([[pr], { workflow_runs: [run] }, { jobs: [job] }]) }), true)
})
test('missing, failed, or cancelled PR runs cannot skip checks', async () => {
  for (const runs of [[], [{ ...run, conclusion: 'failure' }], [{ ...run, conclusion: 'cancelled' }]]) {
    assert.equal(await checksRequired({ ...input, request: request([[pr], { workflow_runs: runs }]) }), true)
  }
})
test('missing or unsuccessful verification markers run checks', async () => {
  for (const jobs of [[], [{ ...job, conclusion: 'failure' }], [{ ...job, steps: [] }],
    [{ ...job, steps: [{ ...job.steps[0], conclusion: 'skipped' }] }]]) {
    assert.equal(await checksRequired({ ...input, request: request([[pr], { workflow_runs: [run] }, { jobs }]) }), true)
  }
})
test('API failures fall back to running checks', async () => {
  assert.equal(await checksRequired({ ...input, request: async () => ({ ok: false, status: 403 }) }), true)
})
