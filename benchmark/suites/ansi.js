const b = require('benny')
const fude = require('fude')
const chalk = require('chalk')

console.log(fude.bgGreen('green ' + fude.ansi('yo', 41) + ' green?'))
console.log(chalk.bgGreen('green ' + chalk.bgAnsi(41)('yo') + ' green?'))

b.suite(
  'ansi',

  b.add('fude', () => fude.bgGreen('green ' + fude.ansi('yo', 41) + ' green?')),

  b.add('chalk', () =>
    chalk.bgGreen('green ' + chalk.bgAnsi(41)('yo') + ' green?')
  ),

  b.cycle(),
  b.complete()
)
