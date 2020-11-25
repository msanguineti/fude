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
//   c.bgRed`${c.white`筆`}` + c.bgWhite` ${c.black`fude`} `

// console.log('\n')
// console.table(
//   Object.keys(modules).map((id) => {
//     const output = test(modules[id])
//     console.log(output)
//     return { lib: id, out: output }
//   })
// )
// console.log('\n')

// process.exit(0)

const addTests = (bench) =>
  Object.keys(modules).map((id) => bench.add(id, () => test(modules[id])))

module.exports = b.suite(
  'String rendering',

  ...addTests(b),

  b.cycle(),
  b.complete(),
  b.save({ file: 'rendering', format: 'chart.html' }),
  b.save({ file: 'rendering', format: 'csv' })
)
