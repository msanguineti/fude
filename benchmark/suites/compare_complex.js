const b = require('benny')
const fude = require('fude')

const saveTests = (bench) => {
  return process.env.SAVE_BENCHMARKS
    ? [
        bench.save({ file: 'compare_complex_rendering', format: 'chart.html' }),
        bench.save({ file: 'compare_complex_rendering', format: 'csv' }),
      ]
    : []
}

b.suite(
  'Rendering a complex string',

  b.add('fude(<ornament>(...))', () =>
    fude.fude(
      'white on bright green and ' +
        fude.italic(
          fude.bold('italic, bold and white on bright green background')
        ),
      fude.white,
      fude.bgBrightGreen
    )
  ),

  b.add('fude(`...`)', () =>
    fude.fude(
      `white on bright green and ${fude.italic(
        fude.bold('italic, bold and white on bright green background')
      )}`,
      fude.white,
      fude.bgBrightGreen
    )
  ),

  b.add('fude(<ornament>`...`)', () =>
    fude.fude(
      `white on bright green and ${fude.italic`
        ${fude.bold`italic, bold and white on bright green background`}
      `}`,
      fude.white,
      fude.bgBrightGreen
    )
  ),

  b.add('ansi(<ornament>(...))', () =>
    fude.ansi(
      'white on bright green and ' +
        fude.italic(
          fude.bold('italic, bold and white on bright green background')
        ),
      fude.bgBrightGreenCode,
      fude.whiteCode
    )
  ),

  b.add('ansi(`...`)', () =>
    fude.ansi(
      `white on bright green and ${fude.italic(
        fude.bold('italic, bold and white on bright green background')
      )}`,
      fude.bgBrightGreenCode,
      fude.whiteCode
    )
  ),

  b.add('ansi(<ornament>`...`))', () =>
    fude.ansi(
      `white on bright green and ${fude.italic`
        ${fude.bold`italic, bold and white on bright green background`}
      `}`,
      fude.bgBrightGreenCode,
      fude.whiteCode
    )
  ),

  b.add('<ornament>(...)', () =>
    fude.bgBrightGreen(
      fude.white(
        'white on bright green and ' +
          fude.italic(
            fude.bold('italic, bold and white on bright green background')
          )
      )
    )
  ),

  b.add('<ornament>(`...`)', () =>
    fude.bgBrightGreen(
      fude.white(
        `white on bright green and ${fude.italic(
          fude.bold('italic, bold and white on bright green background')
        )}`
      )
    )
  ),

  b.add(
    '<ornament>`...`',
    () =>
      fude.bgBrightGreen`${fude.white`white on bright green and ${fude.italic`${fude.bold`italic, bold and white on bright green background`}`}`}`
  ),

  b.cycle(),
  b.complete(),

  ...saveTests(b)
)
