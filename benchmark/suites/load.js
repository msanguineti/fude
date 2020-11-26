const { modules } = require('../modules')

function cleanCache() {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}

cleanCache()

let table = []

const { DRY_RUN_BENCHMARKS } = process.env

const runs =
  DRY_RUN_BENCHMARKS && /^\s*(?:true|1|on)\s*$/i.test(DRY_RUN_BENCHMARKS)
    ? 1
    : 1000

console.log(`\n* Loading libs ${runs} time${runs > 1 ? 's' : ''}:\n`)

Object.keys(modules).forEach((id) => {
  let t = 0
  for (let i = 0; i < runs; i++) {
    const start = Date.now()
    require(id)
    t += Date.now() - start
    cleanCache()
  }
  table.push({ id, time: `${t / runs}ms` })
})

console.table(table)
