const b = require('benny')
const fude = require('fude')
const chalk = require('chalk')

console.log(
  fude.rgbBg(
    fude.rgb('green ' + fude.ansi('yo', 41) + ' green?', {
      r: 41,
      g: 41,
      b: 41,
    }),
    { r: 241, g: 241, b: 241 }
  )
)
console.log(
  chalk.bgRgb(241, 241, 241).rgb(41, 41, 41)(
    'green ' + chalk.bgAnsi(31)('yo') + ' green?'
  )
)

b.suite(
  'rgb',

  b.add('fude', () =>
    fude.rgbBg(
      fude.rgb('green ' + fude.ansi('yo', 41) + ' green?', {
        r: 41,
        g: 41,
        b: 41,
      }),
      { r: 241, g: 241, b: 241 }
    )
  ),

  b.add('chalk', () =>
    chalk.bgRgb(241, 241, 241).rgb(41, 41, 41)(
      'green ' + chalk.bgAnsi(31)('yo') + ' green?'
    )
  ),

  b.cycle(),
  b.complete()
)
