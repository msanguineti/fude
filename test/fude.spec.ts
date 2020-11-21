import * as fude from '../src'

const showMe = (text: string) => {
  if (process.env.FUDE_CHECK_VISUALLY) return console.log(text)
}

beforeEach(() => {
  //ensure outputting codes in case test is done in a non-TTY env... think CI/CD
  process.env.FORCE_COLORS = 'on'
})

describe('core functionalities', () => {
  test('single ornament', () => {
    const output = fude.fude('red', fude.red)
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('two ornaments together', () => {
    const output = fude.fude('bold red', fude.red, fude.bold)
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('ornaments string + string', () => {
    const output =
      fude.fude("i'm bold", fude.bold) + ' ' + fude.fude("i'm red", fude.red)
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('ornaments template strings', () => {
    const output = `${fude.fude('The', fude.dim)} ${fude.fude(
      'leaning',
      fude.italic,
      fude.green
    )} ${fude.fude('tower', fude.white)} ${fude.fude(
      'of',
      fude.dim
    )} ${fude.fude('Pisa', fude.red, fude.blinkSlow)}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('colours are switched off', () => {
    process.env.FORCE_COLORS = 'off'
    const output = fude.fude("this text shouldn't be red", fude.red)
    showMe(output)

    expect(output).toMatchSnapshot()
  })
})

describe('ornaments', () => {
  test('modifiers', () => {
    const output = `${fude.reset('reset')} ${fude.bold('bold')} ${fude.dim(
      'dim'
    )} ${fude.italic('italic')} ${fude.underline(
      'underline'
    )} ${fude.doublyUnderline('doublyUnderline')} ${fude.blinkSlow(
      'slow'
    )} ${fude.blinkFast('fast')} ${fude.invert('invert')} ${fude.hide(
      'hide'
    )} ${fude.strikethrough('strikethrough')}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('foreground colours', () => {
    const output = `${fude.black('black')} ${fude.red('red')} ${fude.green(
      'green'
    )} ${fude.yellow('yellow')} ${fude.blue('blue')} ${fude.magenta(
      'magenta'
    )} ${fude.cyan('cyan')} ${fude.white('white')} ${fude.gray('gray')}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('background colours', () => {
    const output = `${fude.bgBlack('black')} ${fude.bgRed(
      'red'
    )} ${fude.bgGreen('green')} ${fude.bgYellow('yellow')} ${fude.bgBlue(
      'blue'
    )} ${fude.bgMagenta('magenta')} ${fude.bgCyan('cyan')} ${fude.bgWhite(
      'white'
    )} ${fude.bgGray('gray')}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('bright foreground colours', () => {
    const output = `${fude.gray('gray')} ${fude.brightRed(
      'red'
    )} ${fude.brightGreen('green')} ${fude.brightYellow(
      'yellow'
    )} ${fude.brightBlue('blue')} ${fude.brightMagenta(
      'magenta'
    )} ${fude.brightCyan('cyan')} ${fude.brightWhite('white')}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('bright background colours', () => {
    const output = `${fude.bgGray('gray')} ${fude.bgBrightRed(
      'red'
    )} ${fude.bgBrightGreen('green')} ${fude.bgBrightYellow(
      'yellow'
    )} ${fude.bgBrightBlue('blue')} ${fude.bgBrightMagenta(
      'magenta'
    )} ${fude.bgBrightCyan('cyan')} ${fude.bgBrightWhite('white')}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('using codes', () => {
    const output = fude.fudeCodes(
      'black on bright red background',
      fude.brightRedBgCode,
      fude.blackCode
    )
    showMe(output)

    expect(output).toMatchSnapshot()
  })
})

describe('template literals', () => {
  test('simple', () => {
    const output = fude.bgCyan`background is cyan`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  test('nested', () => {
    const output = fude.bgGray`${fude.black`background is gray, text is black with bold and white exclamation mark${fude.bold`${fude.white`!`}`}`}`
    showMe(output)

    expect(output).toMatchSnapshot()
  })

  // const result = `"[41mbgRed[43mbgYellow[49m[41mbgRed[49m"`

  test('using only template literals', () => {
    const output = fude.bgRed`bgRed${
      fude.bgYellow`bgYellow` + fude.bgGreen`bgGreen`
    }bgRed`
    showMe(output)

    expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[49m[41m[42mbgGreen[49m[41mbgRed[49m"`)
  })

  test('mixing template literals with functions', () => {
    const output = fude.bgRed`bgRed${
      fude.bgYellow('bgYellow') + fude.bgGreen('bgGreen')
    }bgRed`
    showMe(output)

    expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[49m[41m[42mbgGreen[49m[41mbgRed[49m"`)
  })

  test('mixing functions with template literals', () => {
    const output = fude.bgRed(
      `bgRed${fude.bgYellow`bgYellow${fude.bgGreen('bgGreen')}`}` + 'bgRed'
    )
    showMe(output)

    expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[42mbgGreen[49m[41m[43m[49m[41mbgRed[49m"`)
  })
})

describe('utils', () => {
  test('TTY capability', () => {
    const output = fude.availableOrnamentCodes()
    showMe(output)

    expect(output).toMatchSnapshot()
  })
})

describe('misc', () => {
  test('simulate headless for full coverage', () => {
    delete process.env.FORCE_COLORS
    const output = fude.fude("it isn't going to fail in ci", fude.red)
    showMe(output)

    if (!process.stdout.isTTY)
      expect(output).toMatch("it isn't going to fail in ci")
    else expect(output).toMatch("[31mit isn't going to fail in ci[39m")
  })
})

describe('readme', () => {
  test('logos', () => {
    const output1 =
      fude.fude('筆', fude.bgRed, fude.white) +
      fude.fude(' fude ', fude.bgWhite, fude.black)

    // alternatively...

    const output2 =
      fude.bgRed(fude.white`筆`) + fude.bgWhite(fude.black` fude `)

    // template literals

    const output3 =
      fude.bgRed`${fude.white`筆`}` + fude.bgWhite`${fude.black` fude `}`

    expect(output1).toMatchInlineSnapshot(`"[41m[37m筆[39m[49m[47m[30m fude [39m[49m"`)
    expect(output1).toMatch(output2)
    expect(output3).toMatch(output1)

    // or nested (same result, slightly different intentions with the backgrounds)...

    const output4 = fude.bgRed(
      fude.white('筆') + fude.bgWhite(` ${fude.black('fude')} `)
    )

    // template literals (also nested)...

    const output5 = fude.bgRed`${fude.white`筆`}${fude.bgWhite` ${fude.black`fude`} `}`

    expect(output4).toMatch(output5)
  })
})
