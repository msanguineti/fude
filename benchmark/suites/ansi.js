const b = require('benny')
const fude = require('fude')
const chalk = require('chalk')

b.suite(
  'ansi',

  b.add('fude', () => fude.bgGreen('green ' + fude.ansi('yo', 41) + ' green?')),

  b.add('chalk', () =>
    chalk.bgGreen('green ' + chalk.bgAnsi(41)('yo') + ' green?')
  ),

  b.cycle(),
  b.complete()
)
