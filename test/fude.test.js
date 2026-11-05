const {
  describe,
  it,
  before,
  after,
  beforeEach,
  afterEach,
} = require('node:test')
const assert = require('node:assert/strict')

describe('Fude CLI colorization/formatting', () => {
  let colorDepth
  let envVars
  let argv

  before(() => {
    // default colorDepth from stdout.getColorDepth()
    colorDepth = Math.min(
      ((process.stdout?.getColorDepth ? process.stdout.getColorDepth() : 0) >>
        2) &
        15,
      3,
    )
    // make sure no environment variables are set before running tests
    delete process.env.FORCE_COLOR
    delete process.env.NODE_DISABLE_COLORS
    delete process.env.NO_COLOR
    delete process.env.HANDLE_RESET
    // remove --color, --no-color and --handle-reset flags from argv
    process.argv = process.argv
      .filter((arg) => !/^--(no-)?color/.test(arg))
      .filter((arg) => !/^--handle-reset/.test(arg))

    envVars = {
      ...process.env,
    }

    argv = [...process.argv]
  })

  describe('color support level', () => {
    const fude = require('../dist')
    it('should be a number', () => {
      assert.strictEqual(typeof fude.colorSupportLevel, 'number')
    })

    it('should be less than or equal to 3 and greater than or equal to 0', () => {
      assert.ok(fude.colorSupportLevel <= 3)
      assert.ok(fude.colorSupportLevel >= 0)
    })

    it('should be equal to the color depth', () => {
      assert.strictEqual(fude.colorSupportLevel, colorDepth)
    })
  })

  describe('basic wrapping', () => {
    let fude

    before(() => {
      delete require.cache[require.resolve('../dist')]
      process.env.FORCE_COLOR = '3'
      fude = require('../dist')
    })

    after(() => {
      process.env = { ...envVars }
    })

    it('should wrap the string with escape codes', () => {
      assert.deepStrictEqual(fude.red('red'), '\u001B[31mred\u001B[39m')
    })

    it('should wrap the number with escape codes', () => {
      assert.deepStrictEqual(fude.red(123), '\u001B[31m123\u001B[39m')
    })

    it('should wrap the embedded color function with escape codes', () => {
      assert.deepStrictEqual(
        fude.red(fude.red('red')),
        '\u001B[31m\u001B[31mred\u001B[31m\u001B[39m',
      )
    })

    it('should wrap "undefined" with escape codes when no string is provided', () => {
      assert.deepStrictEqual(fude.red(), '\u001B[31mundefined\u001B[39m')
    })

    it('should wrap "null" with escape codes when a null is provided', () => {
      assert.deepStrictEqual(fude.red(null), '\u001B[31mnull\u001B[39m')
    })
  })

  describe('ansi256 color support', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../dist')]
    })

    afterEach(() => {
      process.env = { ...envVars }
    })

    it('should colorize the string with ansi256', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.ansi256(9)('text'),
        '\u001B[38;5;9mtext\u001B[39m',
      )
    })

    it('should colorize the background with ansi256', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.bgAnsi256(9)('text'),
        '\u001B[48;5;9mtext\u001B[49m',
      )
    })

    it('should not colorize the string with ansi256 when color support level is less than 2', () => {
      process.env.FORCE_COLOR = '1'
      const fude = require('../dist')
      assert.deepStrictEqual(fude.ansi256(9)('text'), 'text')
    })

    it('should not colorize the background with ansi256 when color support level is less than 2', () => {
      process.env.FORCE_COLOR = '1'
      const fude = require('../dist')
      assert.deepStrictEqual(fude.bgAnsi256(9)('text'), 'text')
    })
  })

  describe('rgb color support', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../dist')]
    })

    afterEach(() => {
      process.env = { ...envVars }
    })

    it('should colorize the string with rgb', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.rgb(255, 0, 0)('text'),
        '\u001B[38;2;255;0;0mtext\u001B[39m',
      )
    })

    it('should colorize the background with rgb', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.bgRgb(255, 0, 0)('text'),
        '\u001B[48;2;255;0;0mtext\u001B[49m',
      )
    })

    it('should not colorize the string with rgb when color support level is less than 3', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.deepStrictEqual(fude.rgb(255, 0, 0)('text'), 'text')
    })

    it('should not colorize the background with rgb when color support level is less than 3', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.deepStrictEqual(fude.bgRgb(255, 0, 0)('text'), 'text')
    })
  })

  describe('hex color support', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../dist')]
    })

    afterEach(() => {
      process.env = { ...envVars }
    })

    it('should colorize the string with hex 3 digits and leading #', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.hex('#123')('text'),
        '\u001B[38;2;17;34;51mtext\u001B[39m',
      )
    })

    it('should colorize the string with hex 6 digits and leading #', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.hex('#123456')('text'),
        '\u001B[38;2;18;52;86mtext\u001B[39m',
      )
    })

    it('should colorize the background with hex 3 digits withouth leading #', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.bgHex('123')('text'),
        '\u001B[48;2;17;34;51mtext\u001B[49m',
      )
    })

    it('should colorize the background with hex 6 digits withouth leading #', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.bgHex('123456')('text'),
        '\u001B[48;2;18;52;86mtext\u001B[49m',
      )
    })

    it('should not colorize the string with hex when color support level is less than 3', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.deepStrictEqual(fude.hex('#123')('text'), 'text')
    })

    it('should not colorize the background with hex when color support level is less than 3', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.deepStrictEqual(fude.bgHex('123456')('text'), 'text')
    })

    it('should throw an error if the parameter is not a string', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.throws(() => fude.hex(900)('text'))
    })

    it('should throw an error if the parameter is not a valid hex color', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.throws(() => fude.hex('#12')('text'))
    })
  })

  describe('environment variable and argv support', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../dist')]
    })

    afterEach(() => {
      process.env = { ...envVars }
      process.argv = [...argv]
    })

    it('should switch to no color mode if the NO_COLOR environment variable is set', () => {
      process.env.NO_COLOR = true
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 0)
    })

    it('should switch to no color mode if the NODE_DISABLE_COLORS environment variable is set', () => {
      process.env.NODE_DISABLE_COLORS = true
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 0)
    })

    it('should switch to no color mode if the FORCE_COLOR environment variable is set to 0', () => {
      process.env.FORCE_COLOR = '0'
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 0)
    })

    it('should switch to no color mode if --no-color is passed as an argument', () => {
      process.argv.push('--no-color')
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 0)
    })

    it('should switch to no color mode if --color=0 is passed as an argument', () => {
      process.argv.push('--color=0')
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 0)
    })

    it('should switch to auto color mode if --color is passed as an argument with a value greater than 3', () => {
      process.argv.push('--color=4')
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, colorDepth)
    })

    it('should switch to auto color mode if --color is passed as an argument with a value less than 0', () => {
      process.argv.push('--color=-1')
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, colorDepth)
    })

    it('should switch to auto color mode if --color is present but no value is passed', () => {
      process.argv.push('--color')
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, colorDepth)
    })

    it('should switch to color mode if --color has a value between 1 and 3', () => {
      process.argv.push('--color=2')
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 2)
    })

    it('should force color mode when both NO_COLOR and FORCE_COLOR are set, and FORCE_COLOR is greater than 0', () => {
      process.env.NO_COLOR = true
      process.env.FORCE_COLOR = '1'
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 1)
    })

    it('should support only basic colors when color support is set to 1', () => {
      process.env.FORCE_COLOR = '1'
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 1)
    })

    it('should support up to 256 colors when color support is set to 2', () => {
      process.env.FORCE_COLOR = '2'
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 2)
    })

    it('should support 16m colors when color support is set to 3', () => {
      process.env.FORCE_COLOR = '3'
      const fude = require('../dist')
      assert.strictEqual(fude.colorSupportLevel, 3)
    })

    it('should not reset correctly when reset is embedded in the text without HANDLE_RESET env variable', () => {
      process.env.FORCE_COLOR = '1' // needed in CI
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.red('text ' + fude.reset('text') + ' text'),
        '\u001B[31mtext \u001B[0mtext\u001B[m text\u001B[39m',
      )
    })

    it('should reset correctly when reset is embedded in the text with HANDLE_RESET env variable', () => {
      process.env.FORCE_COLOR = '1' // needed in CI
      process.env.HANDLE_RESET = 1
      const fude = require('../dist')
      assert.deepStrictEqual(
        fude.red('text ' + fude.reset('text') + ' text'),
        '\u001B[31mtext \u001B[0mtext\u001B[m\u001B[31m text\u001B[39m',
      )
    })
  })

  describe('custom color support', () => {
    const fude = require('../dist')
    it('should return color/formatting functions with the custom color support level', () => {
      const level_0 = fude.Fude({ level: 0 })
      assert.deepStrictEqual(level_0.red('text'), 'text')

      const level_1 = fude.Fude({ level: 1 })
      assert.deepStrictEqual(level_1.red('text'), '\u001B[31mtext\u001B[39m')

      const level_2 = fude.Fude({ level: 2 })
      assert.deepStrictEqual(
        level_2.ansi256(9)('text'),
        '\u001B[38;5;9mtext\u001B[39m',
      )

      const level_3 = fude.Fude({ level: 3 })
      assert.deepStrictEqual(
        level_3.rgb(255, 0, 0)('text'),
        '\u001B[38;2;255;0;0mtext\u001B[39m',
      )
    })

    it('should not colorize the text if the custom color support level is less than the 0 or greater than 3', () => {
      const level_minus_1 = fude.Fude({ level: -1 })
      assert.deepStrictEqual(level_minus_1.red('text'), 'text')

      const level_4 = fude.Fude({ level: 4 })
      assert.deepStrictEqual(level_4.red('text'), 'text')
    })

    it('should not colorize the text if the custom color support level is not "stdout" or "stderr"', () => {
      const level_stdout = fude.Fude({ level: 'whatever' })
      assert.deepStrictEqual(level_stdout.red('text'), 'text')
    })
  })

  describe('template literals handling with helper lib', () => {
    let fude
    before(() => {
      delete require.cache[require.resolve('../dist')]
      process.env.FORCE_COLOR = '3'
      fude = require('../dist')
    })

    after(() => {
      process.env = { ...envVars }
    })
    it('should show awesomeness', () => {
      const helper = require('colorize-template')

      const colorize = helper.createColorize(fude)

      const testCase = colorize`{bgRed {white 筆}}{bgWhite ${fude.rgb(
        0,
        0,
        0,
      )(' fude ')}}`

      assert.deepStrictEqual(
        testCase,
        '\u001B[41m\u001B[37m筆\u001B[39m\u001B[49m\u001B[47m\u001B[38;2;0;0;0m fude \u001B[39m\u001B[49m',
      )
    })
  })
})
