const b = require('benny')
const { modules } = require('../modules')

const test = (c) =>
  c.red(
    `${'X'}${c.blue(
      `${'X'}${c.bold(
        `${'X'}${c.yellow('X')}${'X'}${c.underline('X')}`
      )}${'X'}${c.magenta(`${'X'}${c.white('X')}${c.cyan('X')}${'X'}`)}${'X'}`
    )}${'X'}`
  )

/**
 * Have a look at what is benchmarked
 */
if (
  process.env.DRY_RUN_BENCHMARKS &&
  /^\s*(?:true|1|on)\s*$/i.test(process.env.DRY_RUN_BENCHMARKS)
) {
  console.log('\n* String rendering\n')

  Object.keys(modules).forEach((id) => {
    console.log(test(modules[id]))
  })
} else {
  const addTests = (bench) =>
    Object.keys(modules).map((id) => bench.add(id, () => test(modules[id])))

  module.exports = b.suite(
    'Compare libs string rendering',

    ...addTests(b),

    b.cycle(),
    b.complete(),
    b.save({ file: 'compare_libs_rendering', format: 'chart.html' }),
    b.save({ file: 'compare_libs_rendering', format: 'csv' })
  )
}
