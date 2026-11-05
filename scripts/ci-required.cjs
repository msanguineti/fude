const { appendFileSync } = require('node:fs')
const { execFileSync } = require('node:child_process')

// Reuse PR checks only when they verified the exact tree now on main.
async function checksRequired({ event, repository, sha, tree, token, request = fetch }) {
  if (event !== 'push') return true
  const api = async (route) => {
    const response = await request(`https://api.github.com/repos/${repository}/${route}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
    return response.json()
  }
  try {
    const prs = await api(`commits/${sha}/pulls?per_page=100`)
    for (const pr of prs) {
      if (!pr.merged_at || pr.merge_commit_sha !== sha || pr.base.ref !== 'main') continue
      const result = await api(`actions/workflows/node.js.yml/runs?event=pull_request&head_sha=${pr.head.sha}&status=success&per_page=30`)
      for (const run of result.workflow_runs) {
        if (run.conclusion !== 'success') continue
        const { jobs } = await api(`actions/runs/${run.id}/jobs?filter=latest&per_page=100`)
        if (jobs.some(job => job.name === 'CI passed' && job.conclusion === 'success' &&
          job.steps.some(step => step.name === `Verified tree ${tree}` && step.conclusion === 'success'))) return false
      }
    }
  } catch (error) {
    console.warn(`Could not confirm prior CI: ${error.message}; running checks.`)
  }
  return true
}

if (require.main === module) {
  checksRequired({
    event: process.env.GITHUB_EVENT_NAME,
    repository: process.env.GITHUB_REPOSITORY,
    sha: process.env.GITHUB_SHA,
    tree: execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim(),
    token: process.env.GITHUB_TOKEN,
  }).then(run => {
    appendFileSync(process.env.GITHUB_OUTPUT, `run=${run}\n`)
    console.log(run ? 'Running CI.' : 'Exact merged tree already passed PR CI; skipping duplicate checks.')
  }).catch(error => { console.error(error); process.exitCode = 1 })
}

module.exports = { checksRequired }
