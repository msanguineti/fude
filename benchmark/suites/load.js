const { modules } = require('../modules')

function cleanCache() {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}

cleanCache()

let table = []

Object.keys(modules).forEach((id) => {
  let t = 0
  for (let i = 0; i < 1000; i++) {
    const start = Date.now()
    require(id)
    t += Date.now() - start
    cleanCache()
  }
  table.push({ id, time: `${t / 1000}ms` })
})

console.table(table)
