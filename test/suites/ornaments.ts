import * as fude from '../../src'
import { showMe } from './showMe'

export const ornaments = (): void =>
  describe('ornaments', () => {
    beforeAll(() => {
      // CI/CD need this
      fude.setEnabled(true)
    })

    test('modifiers', () => {
      const output = `${fude.reset('reset')} ${fude.bold('bold')} ${fude.dim(
        'dim'
      )} ${fude.italic('italic')} ${fude.underline(
        'underline'
      )} ${fude.doublyUnderline('doublyUnderline')} ${fude.blinkSlow(
        'slow'
      )} ${fude.blinkFast('fast')} ${fude.inverse('inverse')} ${fude.hide(
        'hide'
      )} ${fude.strikethrough('strikethrough')}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[0mreset[0m [1mbold[22m [2mdim[22m [3mitalic[23m [4munderline[24m [21mdoublyUnderline[24m [5mslow[25m [6mfast[26m [7minverse[27m [8mhide[28m [9mstrikethrough[29m"`
      )
    })

    test('foreground colors', () => {
      const output = `${fude.black('black')} ${fude.red('red')} ${fude.green(
        'green'
      )} ${fude.yellow('yellow')} ${fude.blue('blue')} ${fude.magenta(
        'magenta'
      )} ${fude.cyan('cyan')} ${fude.white('white')} ${fude.gray('gray')}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[30mblack[39m [31mred[39m [32mgreen[39m [33myellow[39m [34mblue[39m [35mmagenta[39m [36mcyan[39m [37mwhite[39m [90mgray[39m"`
      )
    })

    test('background colors', () => {
      const output = `${fude.bgBlack('black')} ${fude.bgRed(
        'red'
      )} ${fude.bgGreen('green')} ${fude.bgYellow('yellow')} ${fude.bgBlue(
        'blue'
      )} ${fude.bgMagenta('magenta')} ${fude.bgCyan('cyan')} ${fude.bgWhite(
        'white'
      )} ${fude.bgGray('gray')}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[40mblack[49m [41mred[49m [42mgreen[49m [43myellow[49m [44mblue[49m [45mmagenta[49m [46mcyan[49m [47mwhite[49m [100mgray[49m"`
      )
    })

    test('bright foreground colors', () => {
      const output = `${fude.gray('gray')} ${fude.brightRed(
        'red'
      )} ${fude.brightGreen('green')} ${fude.brightYellow(
        'yellow'
      )} ${fude.brightBlue('blue')} ${fude.brightMagenta(
        'magenta'
      )} ${fude.brightCyan('cyan')} ${fude.brightWhite('white')}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[90mgray[39m [91mred[39m [92mgreen[39m [93myellow[39m [94mblue[39m [95mmagenta[39m [96mcyan[39m [97mwhite[39m"`
      )
    })

    test('bright background colors', () => {
      const output = `${fude.bgGray('gray')} ${fude.bgBrightRed(
        'red'
      )} ${fude.bgBrightGreen('green')} ${fude.bgBrightYellow(
        'yellow'
      )} ${fude.bgBrightBlue('blue')} ${fude.bgBrightMagenta(
        'magenta'
      )} ${fude.bgBrightCyan('cyan')} ${fude.bgBrightWhite('white')}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[100mgray[49m [101mred[49m [102mgreen[49m [103myellow[49m [104mblue[49m [105mmagenta[49m [106mcyan[49m [107mwhite[49m"`
      )
    })
  })
