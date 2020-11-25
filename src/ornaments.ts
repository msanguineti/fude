/**
 * 文字装飾 - A ornament to apply to some text
 *
 * @param text the input string
 * @returns the modified input string
 */
export type CharacterOrnament = (
  ...text:
    | string[]
    | TemplateStringsArray[]
    | [TemplateStringsArray, ...string[]]
) => string

/**
 * This code was taken from Kleur (https://github.com/lukeed/kleur) and adapted for our use case.
 *
 * FORCE_COLOR should decide whether to force colors or not.
 */
const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env
const isTTY = process.stdout && process.stdout.isTTY

let enabled =
  !NODE_DISABLE_COLORS &&
  NO_COLOR == null &&
  TERM !== 'dumb' &&
  (FORCE_COLOR == null || !/^\s*(?:false|0|off)\s*$/i.test(FORCE_COLOR)) &&
  isTTY

export const setEnabled = (colorsEnabled: boolean): void => {
  enabled = colorsEnabled
}

export const isEnabled = (): boolean => enabled

const templates = (txt, keys, opt) => {
  let ret = txt[0]
  for (let i = 0; i < keys.length; i++) {
    ret += keys[i] + txt[i + 1]
  }

  return enabled
    ? opt.open +
        (ret.includes(opt.close) ? ret.replace(opt.rgx, opt.open) : ret) +
        opt.close
    : ret
}

/**
 * 筆致 - Only apply the given modifier to the input string if we are in a TTY environment or if the FORCE_COLOR flag is set.
 *
 * @param text the input string
 * @param on the modifier on code
 * @param off the modifier off code
 * @returns a string with the applied modifier
 */
const hitchi = (on, off) => {
  const opt = {
    open: `\x1b[${on}m`,
    close: `\x1b[${off}m`,
    rgx: new RegExp(`\\x1b\\[${off}m`, 'g'),
  }
  return (txt, ...keys) =>
    keys.length !== 0
      ? templates(txt, keys, opt)
      : enabled
      ? opt.open +
        (txt.includes(opt.close) ? txt.replace(opt.rgx, opt.open) : txt) +
        opt.close
      : txt + ''
}

/**
 * All attributes off.
 *
 * @param text the input string
 */
export const reset: CharacterOrnament = hitchi(0, 0)

/**
 * Bold or increased intensity.
 *
 * @param text the input string
 */
export const bold: CharacterOrnament = hitchi(1, 22)

/**
 * Faint or decreased intensity.
 *
 * @param text the input string
 */
export const dim: CharacterOrnament = hitchi(2, 22)

/**
 * Italic text.
 *
 * @param text the input string
 */
export const italic: CharacterOrnament = hitchi(3, 23)

/**
 * Underline text.
 *
 * @param text the input string
 */
export const underline: CharacterOrnament = hitchi(4, 24)

/**
 * Double-Underline text.
 *
 * @param text the input string
 */
export const doublyUnderline: CharacterOrnament = hitchi(21, 24)

/**
 * Text blinks less than 150 times per minute.
 *
 * (console implementation dependent)
 *
 * @param text the input string
 */
export const blinkSlow: CharacterOrnament = hitchi(5, 25)

/**
 * Text blinks more than 150 times per minute.
 *
 * (console implementation dependent)
 *
 * @param text the input string
 */
export const blinkFast: CharacterOrnament = hitchi(6, 26)

/**
 * Reverse / Invert text.
 *
 * Swaps foreground and background colors.
 *
 * @param text the input string
 */
export const inverse: CharacterOrnament = hitchi(7, 27)

/**
 * Conceal / Hide text.
 *
 * @param text the input string
 */
export const hide: CharacterOrnament = hitchi(8, 28)

/**
 * Crossed-out / Strike-through text.
 *
 * Characters legible but marked as for deletion.
 *
 * @param text the input string
 */
export const strikethrough: CharacterOrnament = hitchi(9, 29)

/**
 * Black foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const black: CharacterOrnament = hitchi(30, 39)

/**
 * Red foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const red: CharacterOrnament = hitchi(31, 39)

/**
 * Green foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const green: CharacterOrnament = hitchi(32, 39)

/**
 * Yellow foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const yellow: CharacterOrnament = hitchi(33, 39)

/**
 * Blue foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const blue: CharacterOrnament = hitchi(34, 39)

/**
 * Magenta foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const magenta: CharacterOrnament = hitchi(35, 39)

/**
 * Cyan foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const cyan: CharacterOrnament = hitchi(36, 39)

/**
 * White foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const white: CharacterOrnament = hitchi(37, 39)

/**
 * Gray (a.k.a. Bright Black) foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const gray: CharacterOrnament = hitchi(90, 39)

/**
 * Bright Red foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightRed: CharacterOrnament = hitchi(91, 39)

/**
 * Bright Green foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightGreen: CharacterOrnament = hitchi(92, 39)

/**
 * Bright Yellow foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightYellow: CharacterOrnament = hitchi(93, 39)

/**
 * Bright Blue foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightBlue: CharacterOrnament = hitchi(94, 39)

/**
 * Bright Magenta foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightMagenta: CharacterOrnament = hitchi(95, 39)

/**
 * Bright Cyan foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightCyan: CharacterOrnament = hitchi(96, 39)

/**
 * Bright White foreground color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightWhite: CharacterOrnament = hitchi(97, 39)

/**
 * Black background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBlack: CharacterOrnament = hitchi(40, 49)

/**
 * Red background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgRed: CharacterOrnament = hitchi(41, 49)

/**
 * Green background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgGreen: CharacterOrnament = hitchi(42, 49)

/**
 * Yellow background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgYellow: CharacterOrnament = hitchi(43, 49)

/**
 * Blue background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBlue: CharacterOrnament = hitchi(44, 49)

/**
 * Magenta background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgMagenta: CharacterOrnament = hitchi(45, 49)

/**
 * Cyan background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgCyan: CharacterOrnament = hitchi(46, 49)

/**
 * White background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgWhite: CharacterOrnament = hitchi(47, 49)

/**
 * Black background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgGray: CharacterOrnament = hitchi(100, 49)

/**
 * Red background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightRed: CharacterOrnament = hitchi(101, 49)

/**
 * Green background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightGreen: CharacterOrnament = hitchi(102, 49)

/**
 * Yellow background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightYellow: CharacterOrnament = hitchi(103, 49)

/**
 * Blue background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightBlue: CharacterOrnament = hitchi(104, 49)

/**
 * Magenta background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightMagenta: CharacterOrnament = hitchi(105, 49)

/**
 * Cyan background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightCyan: CharacterOrnament = hitchi(106, 49)

/**
 * White background color.
 *
 * (exact color #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightWhite: CharacterOrnament = hitchi(107, 49)
