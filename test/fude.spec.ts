import * as fude from '../src'

describe('core functionalities', () => {
  test('single ornament', () => {
    const output = { text: fude.fude('bar', fude.red) }
    expect(output).toMatchSnapshot({
      text: expect.stringContaining('\x1b[31mbar\x1b[39m'),
    })
  })

  test('two ornaments', () => {
    const output = { text: fude.fude('bar', fude.red, fude.bold) }
    expect(output).toMatchSnapshot({
      text: expect.stringContaining('\x1b[31m\x1b[1mbar\x1b[22m\x1b[39m'),
    })
  })

  test('colours are switched off', () => {
    process.env.FORCE_COLOURS = '0'
    const output = { text: fude.fude('bar', fude.red) }
    expect(output).toMatchSnapshot({ text: expect.stringMatching('bar') })
    process.env.FORCE_COLOURS = '1'
  })
})

describe('ornaments', () => {
  test('modifiers', () => {
    const output = {
      text: fude.reset(
        `reset ${fude.bold('bold')} ${fude.dim('dim')} ${fude.italic(
          'italic'
        )} ${fude.underline('underline')} ${fude.doublyUnderline(
          'doublyUnderline'
        )} ${fude.blinkSlow('slow')} ${fude.blinkFast('fast')} ${fude.invert(
          'invert'
        )} ${fude.hide('hide')} ${fude.strikethrough('strikethrough')}`
      ),
    }
    expect(output).toMatchSnapshot({
      text: expect.stringContaining(
        '\x1b[0mreset \x1b[1mbold\x1b[22m \x1b[2mdim\x1b[22m \x1b[3mitalic\x1b[23m \x1b[4munderline\x1b[24m \x1b[21mdoublyUnderline\x1b[24m \x1b[5mslow\x1b[25m \x1b[6mfast\x1b[26m \x1b[7minvert\x1b[27m \x1b[8mhide\x1b[28m \x1b[9mstrikethrough\x1b[29m\x1b[0m'
      ),
    })
  })

  test('foreground colours', () => {
    const output = {
      text: fude.black(
        `black ${fude.red('red')} ${fude.green('green')} ${fude.yellow(
          'yellow'
        )} ${fude.blue('blue')} ${fude.magenta('magenta')} ${fude.cyan(
          'cyan'
        )} ${fude.white('white')} ${fude.gray('gray')}`
      ),
    }
    expect(output).toMatchSnapshot({
      text: expect.stringContaining(
        '\x1b[30mblack \x1b[31mred\x1b[39m \x1b[32mgreen\x1b[39m \x1b[33myellow\x1b[39m \x1b[34mblue\x1b[39m \x1b[35mmagenta\x1b[39m \x1b[36mcyan\x1b[39m \x1b[37mwhite\x1b[39m \x1b[90mgray\x1b[39m\x1b[39'
      ),
    })
  })

  test('background colours', () => {
    const output = {
      text: fude.bgBlack(
        `black ${fude.bgRed('red')} ${fude.bgGreen('green')} ${fude.bgYellow(
          'yellow'
        )} ${fude.bgBlue('blue')} ${fude.bgMagenta('magenta')} ${fude.bgCyan(
          'cyan'
        )} ${fude.bgWhite('white')} ${fude.bgGray('gray')}`
      ),
    }
    expect(output).toMatchSnapshot(
      '\x1b[40mblack \x1b[41mred\x1b[49m \x1b[42mgreen\x1b[49m \x1b[43myellow\x1b[49m \x1b[44mblue\x1b[49m \x1b[45mmagenta\x1b[49m \x1b[46mcyan\x1b[49m \x1b[47mwhite\x1b[49m \x1b[100mgray\x1b[49m\x1b[49m'
    )
  })

  test('bright foreground colours', () => {
    const output = {
      text: fude.gray(
        `gray ${fude.brightRed('red')} ${fude.brightGreen(
          'green'
        )} ${fude.brightYellow('yellow')} ${fude.brightBlue(
          'blue'
        )} ${fude.brightMagenta('magenta')} ${fude.brightCyan(
          'cyan'
        )} ${fude.brightWhite('white')}`
      ),
    }
    expect(output).toMatchSnapshot(
      '\x1b[90mblack \x1b[91mred\x1b[39m \x1b[92mgreen\x1b[39m \x1b[93myellow\x1b[39m \x1b[94mblue\x1b[39m \x1b[95mmagenta\x1b[39m \x1b[96mcyan\x1b[39m \x1b[97mwhite\x1b[39m\x1b[39m'
    )
  })

  test('bright background colours', () => {
    const output = {
      text: fude.bgGray(
        `gray ${fude.bgBrightRed('red')} ${fude.bgBrightGreen(
          'green'
        )} ${fude.bgBrightYellow('yellow')} ${fude.bgBrightBlue(
          'blue'
        )} ${fude.bgBrightMagenta('magenta')} ${fude.bgBrightCyan(
          'cyan'
        )} ${fude.bgBrightWhite('white')} `
      ),
    }
    expect(output).toMatchSnapshot(
      '\x1b[100mblack \x1b[101mred\x1b[49m \x1b[102mgreen\x1b[49m \x1b[103myellow\x1b[49m \x1b[104mblue\x1b[49m \x1b[105mmagenta\x1b[49m \x1b[106mcyan\x1b[49m \x1b[107mwhite\x1b[49m\x1b[49m'
    )
  })

  test('using codes', () => {
    const output = { text: fude.fudeCodes('foo', fude.yellowCode) }
    expect(output).toMatchSnapshot({
      text: expect.stringContaining('\x1b[33mfoo\x1b[0m'),
    })
  })
})

describe('util', () => {
  test('all the codes', () => {
    const output = { text: fude.availableOrnamentCodes() }
    expect(output).toMatchSnapshot()
  })
})
