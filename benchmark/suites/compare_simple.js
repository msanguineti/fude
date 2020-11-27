const b = require('benny')
const fude = require('fude')

b.suite(
  'Rendering a simple string',

  b.add('fude(...)', () =>
    fude.fude('white on bright green', fude.bgBrightGreen, fude.white)
  ),

  b.add('ansi(...)', () =>
    fude.ansi('white on bright green', fude.bgBrightGreenCode, fude.whiteCode)
  ),

  b.add('<ornament>(...)', () =>
    fude.bgBrightGreen(fude.white('white on bright green'))
  ),

  b.add(
    '<ornament>`...`',
    () => fude.bgBrightGreen`${fude.white`white on bright green`}`
  ),

  b.cycle(),
  b.complete(),
  b.save({ file: 'compare_simple_rendering', format: 'chart.html' }),
  b.save({ file: 'compare_simple_rendering', format: 'csv' })
)
