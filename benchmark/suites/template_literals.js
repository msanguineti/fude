const { modules } = require('../modules')

const test = (c) => c.bgRed`${c.white`筆`}` + c.bgWhite` ${c.black`fude`} `

console.log('\n')
console.table(
  Object.keys(modules).map((id) => {
    const output = test(modules[id])
    console.log(output)
    return { lib: id, out: output }
  })
)
console.log('\n')
