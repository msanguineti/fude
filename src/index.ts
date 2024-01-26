type ColorSupportLevel = 0 | 1 | 2 | 3

// returns the color support level of the given stream or 0 (no color support)
// The stream color depth value needs to be mapped to the color support level
// @see tty.WriteStream.getColorDepth([env])
const autoDetectColorSupport = (stream: string) =>
  (stream === 'stdout' || stream === 'stderr') &&
  process[stream].isTTY &&
  typeof process[stream].getColorDepth === 'function'
    ? Math.min((process[stream].getColorDepth() >> 2) & 15, 3)
    : (0 as ColorSupportLevel)

const noColor =
  process.argv.some((argument) => argument.startsWith('--no-color')) ||
  process.env.NODE_DISABLE_COLORS !== undefined ||
  process.env.NO_COLOR !== undefined
    ? 0
    : undefined

const forceColor =
  /^[0-3]$/.exec(String(process.env.FORCE_COLOR))?.[0] ??
  process.argv
    .find((argument) => /^--color($|=[0-3]$)/.test(argument))
    ?.split('=')[1]

/**
 * Color support level.
 * @returns {number} 0 - no color support, 1 - basic color support, 2 - 256 color support, 3 - 16m color support
 */
export const colorSupportLevel = forceColor
  ? Number.parseInt(forceColor, 10)
  : noColor ?? autoDetectColorSupport('stdout')

const replaceSequence = (
  string: string,
  sequence: string,
  replace: string,
  index = string.indexOf(sequence),
): string =>
  index === -1
    ? string
    : string.slice(0, index) +
      replace +
      replaceSequence(string.slice(index + sequence.length), sequence, replace)

const wrap = (
  string: string,
  open: string,
  close: string,
  index = string.indexOf(close, open.length),
) =>
  index === -1
    ? open + string + close
    : open + replaceSequence(string, close, open, index) + close

const resetClose = '\u001B[m'

const formatReset = (open: string, close: string) => (text: string | number) =>
  wrap(
    replaceSequence(String(text), resetClose, resetClose + open),
    open,
    close,
  )

const format = (open: string, close: string) => (text: string | number) =>
  wrap(String(text), open, close)

const hasReset =
  process.env.HANDLE_RESET !== undefined ||
  process.argv.some((argument) => argument.startsWith('--handle-reset'))

const handleReset = hasReset ? formatReset : format

const initSupport = (
  useColor: boolean,
  function_: (text: string | number) => string,
) => (useColor ? function_ : String)

const initFgColors = (useColor = colorSupportLevel >= 1) => ({
  black: initSupport(useColor, handleReset(`\u001B[30m`, `\u001B[39m`)),
  red: initSupport(useColor, handleReset(`\u001B[31m`, `\u001B[39m`)),
  green: initSupport(useColor, handleReset(`\u001B[32m`, `\u001B[39m`)),
  yellow: initSupport(useColor, handleReset(`\u001B[33m`, `\u001B[39m`)),
  blue: initSupport(useColor, handleReset(`\u001B[34m`, `\u001B[39m`)),
  magenta: initSupport(useColor, handleReset(`\u001B[35m`, `\u001B[39m`)),
  cyan: initSupport(useColor, handleReset(`\u001B[36m`, `\u001B[39m`)),
  white: initSupport(useColor, handleReset(`\u001B[37m`, `\u001B[39m`)),
  gray: initSupport(useColor, handleReset(`\u001B[90m`, `\u001B[39m`)),
  grey: initSupport(useColor, handleReset(`\u001B[90m`, `\u001B[39m`)),
  blackBright: initSupport(useColor, handleReset(`\u001B[90m`, `\u001B[39m`)),
  redBright: initSupport(useColor, handleReset(`\u001B[91m`, `\u001B[39m`)),
  greenBright: initSupport(useColor, handleReset(`\u001B[92m`, `\u001B[39m`)),
  yellowBright: initSupport(useColor, handleReset(`\u001B[93m`, `\u001B[39m`)),
  blueBright: initSupport(useColor, handleReset(`\u001B[94m`, `\u001B[39m`)),
  magentaBright: initSupport(useColor, handleReset(`\u001B[95m`, `\u001B[39m`)),
  cyanBright: initSupport(useColor, handleReset(`\u001B[96m`, `\u001B[39m`)),
  whiteBright: initSupport(useColor, handleReset(`\u001B[97m`, `\u001B[39m`)),
})

/**
 * Foreground colors.
 * @param text - The text to color
 * @example red('Hello') //=> "Hello" in red
 */
export const {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  grey,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
} = initFgColors()

const initBgColors = (useColor = colorSupportLevel >= 1) => ({
  bgBlack: initSupport(useColor, handleReset(`\u001B[40m`, `\u001B[49m`)),
  bgRed: initSupport(useColor, handleReset(`\u001B[41m`, `\u001B[49m`)),
  bgGreen: initSupport(useColor, handleReset(`\u001B[42m`, `\u001B[49m`)),
  bgYellow: initSupport(useColor, handleReset(`\u001B[43m`, `\u001B[49m`)),
  bgBlue: initSupport(useColor, handleReset(`\u001B[44m`, `\u001B[49m`)),
  bgMagenta: initSupport(useColor, handleReset(`\u001B[45m`, `\u001B[49m`)),
  bgCyan: initSupport(useColor, handleReset(`\u001B[46m`, `\u001B[49m`)),
  bgWhite: initSupport(useColor, handleReset(`\u001B[47m`, `\u001B[49m`)),
  bgGray: initSupport(useColor, handleReset(`\u001B[100m`, `\u001B[49m`)),
  bgGrey: initSupport(useColor, handleReset(`\u001B[100m`, `\u001B[49m`)),
  bgBlackBright: initSupport(
    useColor,
    handleReset(`\u001B[100m`, `\u001B[49m`),
  ),
  bgRedBright: initSupport(useColor, handleReset(`\u001B[101m`, `\u001B[49m`)),
  bgGreenBright: initSupport(
    useColor,
    handleReset(`\u001B[102m`, `\u001B[49m`),
  ),
  bgYellowBright: initSupport(
    useColor,
    handleReset(`\u001B[103m`, `\u001B[49m`),
  ),
  bgBlueBright: initSupport(useColor, handleReset(`\u001B[104m`, `\u001B[49m`)),
  bgMagentaBright: initSupport(
    useColor,
    handleReset(`\u001B[105m`, `\u001B[49m`),
  ),
  bgCyanBright: initSupport(useColor, handleReset(`\u001B[106m`, `\u001B[49m`)),
  bgWhiteBright: initSupport(
    useColor,
    handleReset(`\u001B[107m`, `\u001B[49m`),
  ),
})

/**
 * Background colors.
 * @param text - The text which background will be colored.
 * @example bgBlack('Hello World') // => "Hello World" (black background)
 */
export const {
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  bgGray,
  bgGrey,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
} = initBgColors()

const initModifiers = (enabled = colorSupportLevel >= 1) => ({
  reset: initSupport(
    enabled,
    (text: string | number) => `\u001B[0m${text}${resetClose}`,
  ),
  bold: initSupport(
    enabled,
    handleReset(`\u001B[22m\u001B[1m`, `\u001B[2m\u001B[22m`),
  ),
  dim: initSupport(
    enabled,
    handleReset(`\u001B[22m\u001B[2m`, `\u001B[2m\u001B[22m`),
  ),
  italic: initSupport(enabled, handleReset(`\u001B[3m`, `\u001B[23m`)),
  underline: initSupport(enabled, handleReset(`\u001B[4m`, `\u001B[24m`)),
  blink: initSupport(enabled, handleReset(`\u001B[5m`, `\u001B[25m`)),
  inverse: initSupport(enabled, handleReset(`\u001B[7m`, `\u001B[27m`)),
  hidden: initSupport(enabled, handleReset(`\u001B[8m`, `\u001B[28m`)),
  strikethrough: initSupport(enabled, handleReset(`\u001B[9m`, `\u001B[29m`)),
})

/**
 * Modifiers.
 * @param text - The text to be modified.
 * @example italic('Hello World') // => "Hello World" in italic
 */
export const {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  blink,
  hidden,
  strikethrough,
} = initModifiers()

const initAnsi256 = (enabled = colorSupportLevel >= 2) => ({
  ansi256: (code: number) =>
    enabled ? handleReset(`\u001B[38;5;${code}m`, `\u001B[39m`) : String,
  bgAnsi256: (code: number) =>
    enabled ? handleReset(`\u001B[48;5;${code}m`, `\u001B[49m`) : String,
})

/**
 * ANSI 256 colors.
 * @param code - The color code (0-255).
 * @example ansi256(9)('Hello') //=> "Hello" in red
 */
export const { ansi256, bgAnsi256 } = initAnsi256()

const initRgb = (enabled = colorSupportLevel >= 3) => ({
  rgb: (r: number, g: number, b: number) =>
    enabled ? handleReset(`\u001B[38;2;${r};${g};${b}m`, `\u001B[39m`) : String,
  bgRgb: (r: number, g: number, b: number) =>
    enabled ? handleReset(`\u001B[48;2;${r};${g};${b}m`, `\u001B[49m`) : String,
})

/**
 * RGB colors.
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @example rgb(255, 0, 0)('Hello') //=> "Hello" in red
 */
export const { rgb, bgRgb } = initRgb()

const hexToRGB = (enabled: string) =>
  enabled.length <= 4
    ? (/^#?([\da-f])([\da-f])([\da-f])$/i
        .exec(enabled)
        ?.slice(1)
        .map((x) => Number.parseInt(x + x, 16)) as unknown as readonly [
        number,
        number,
        number,
      ])
    : (/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i
        .exec(enabled)
        ?.slice(1)
        .map((x) => Number.parseInt(x, 16)) as unknown as readonly [
        number,
        number,
        number,
      ])

const initHex = (enabled = colorSupportLevel >= 3) => ({
  hex: (hexString: string) =>
    enabled
      ? handleReset(
          `\u001B[38;2;${hexToRGB(hexString).join(';')}m`,
          `\u001B[39m`,
        )
      : String,
  bgHex: (hexString: string) =>
    enabled
      ? handleReset(
          `\u001B[48;2;${hexToRGB(hexString).join(';')}m`,
          `\u001B[49m`,
        )
      : String,
})

/**
 * HEX colors.
 * @param hexString - The hex color code, 3 or 6 characters, with or without the leading #.
 * @example hex('#ff0000')('Hello') //=> "Hello" in red
 */
export const { hex, bgHex } = initHex()

/**
 * Overrides the default color support level.
 * @param level - The color support level to use. Either 0, 1, 2 or 3, or 'stdout'/'stderr' to use the default level for the selected stream.
 * @returns a set of color/formatting functions for the given color support level.
 */
export const Fude = ({
  level,
}: Readonly<{
  level: ColorSupportLevel | 'stdout' | 'stderr'
}>) => {
  const support =
    typeof level === 'number' ? level : autoDetectColorSupport(level)

  return {
    ...initFgColors(support > 0 && support < 4),
    ...initBgColors(support > 0 && support < 4),
    ...initModifiers(support > 0 && support < 4),
    ...initAnsi256(support > 1 && support < 4),
    ...initRgb(support === 3),
    ...initHex(support === 3),
  }
}
