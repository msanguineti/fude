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
 * `true` if we are in a TTY environment or whatever the user has set FORCE_COLORS to.
 */
const forceColours = () =>
  process.env.FORCE_COLORS
    ? /^\s*(true|1|on)\s*$/i.test(process.env.FORCE_COLORS)
    : process.stdout.isTTY

/**
 * Wraps some text with ANSI codes only if we are in a TTY environment or the user has explicitly set FORCE_COLORS
 *
 * @param on ansi escape code on switch
 * @param text the text to wrap with the ansi escape codes
 * @param off ansi escape code off switch
 * @returns `on` + `text` + `off` OR `text`
 */
const wrap = (on: number, text: string, off: number) =>
  forceColours()
    ? `\x1b[${on}m${text.replace(
        new RegExp(`\\x1b\\[${off}m`, 'g'),
        `\x1b[${off}m\x1b[${on}m`
      )}\x1b[${off}m`
    : text

/**
 * 筆致 - Only apply the given modifier to the input string if we are in a TTY environment or if the FORCE_COLORS flag is set.
 *
 * @param text the input string
 * @param on the modifier on code
 * @param off the modifier off code
 * @returns a string with the applied modifier
 */
const hitchi = ({ on, off }: { on: number; off: number }) => (
  ...input:
    | TemplateStringsArray[]
    | string[]
    | [TemplateStringsArray, ...string[]]
) => {
  const [strings, ...keys] = input

  const ret = [...strings]
  for (let i = 0; i < keys.length; i++) {
    ret.splice(i + i + 1, 0, keys[i] as string)
  }

  return wrap(on, ret.join(''), off)
}

/**
 * All attributes off.
 *
 * @param text the input string
 */
export const reset: CharacterOrnament = hitchi({ on: 0, off: 0 })

/**
 * Bold or increased intensity.
 *
 * @param text the input string
 */
export const bold: CharacterOrnament = hitchi({ on: 1, off: 22 })

/**
 * Faint or decreased intensity.
 *
 * @param text the input string
 */
export const dim: CharacterOrnament = hitchi({ on: 2, off: 22 })

/**
 * Italic text.
 *
 * @param text the input string
 */
export const italic: CharacterOrnament = hitchi({ on: 3, off: 23 })

/**
 * Underline text.
 *
 * @param text the input string
 */
export const underline: CharacterOrnament = hitchi({ on: 4, off: 24 })

/**
 * Double-Underline text.
 *
 * @param text the input string
 */
export const doublyUnderline: CharacterOrnament = hitchi({
  on: 21,
  off: 24,
})

/**
 * Text blinks less than 150 times per minute.
 *
 * (console implementation dependent)
 *
 * @param text the input string
 */
export const blinkSlow: CharacterOrnament = hitchi({ on: 5, off: 25 })

/**
 * Text blinks more than 150 times per minute.
 *
 * (console implementation dependent)
 *
 * @param text the input string
 */
export const blinkFast: CharacterOrnament = hitchi({ on: 6, off: 26 })

/**
 * Reverse / Invert text.
 *
 * Swaps foreground and background colours.
 *
 * @param text the input string
 */
export const invert: CharacterOrnament = hitchi({ on: 7, off: 27 })

/**
 * Conceal / Hide text.
 *
 * @param text the input string
 */
export const hide: CharacterOrnament = hitchi({ on: 8, off: 28 })

/**
 * Crossed-out / Strike-through text.
 *
 * Characters legible but marked as for deletion.
 *
 * @param text the input string
 */
export const strikethrough: CharacterOrnament = hitchi({
  on: 9,
  off: 29,
})

/**
 * Black foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const black: CharacterOrnament = hitchi({ on: 30, off: 39 })

/**
 * Red foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const red: CharacterOrnament = hitchi({ on: 31, off: 39 })

/**
 * Green foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const green: CharacterOrnament = hitchi({ on: 32, off: 39 })

/**
 * Yellow foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const yellow: CharacterOrnament = hitchi({ on: 33, off: 39 })

/**
 * Blue foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const blue: CharacterOrnament = hitchi({ on: 34, off: 39 })

/**
 * Magenta foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const magenta: CharacterOrnament = hitchi({ on: 35, off: 39 })

/**
 * Cyan foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const cyan: CharacterOrnament = hitchi({ on: 36, off: 39 })

/**
 * White foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const white: CharacterOrnament = hitchi({ on: 37, off: 39 })

/**
 * Gray (a.k.a. Bright Black) foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const gray: CharacterOrnament = hitchi({ on: 90, off: 39 })

/**
 * Bright Red foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightRed: CharacterOrnament = hitchi({ on: 91, off: 39 })

/**
 * Bright Green foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightGreen: CharacterOrnament = hitchi({
  on: 92,
  off: 39,
})

/**
 * Bright Yellow foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightYellow: CharacterOrnament = hitchi({
  on: 93,
  off: 39,
})

/**
 * Bright Blue foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightBlue: CharacterOrnament = hitchi({
  on: 94,
  off: 39,
})

/**
 * Bright Magenta foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightMagenta: CharacterOrnament = hitchi({
  on: 95,
  off: 39,
})

/**
 * Bright Cyan foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightCyan: CharacterOrnament = hitchi({
  on: 96,
  off: 39,
})

/**
 * Bright White foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightWhite: CharacterOrnament = hitchi({
  on: 97,
  off: 39,
})

/**
 * Black background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBlack: CharacterOrnament = hitchi({ on: 40, off: 49 })

/**
 * Red background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgRed: CharacterOrnament = hitchi({ on: 41, off: 49 })

/**
 * Green background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgGreen: CharacterOrnament = hitchi({ on: 42, off: 49 })

/**
 * Yellow background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgYellow: CharacterOrnament = hitchi({ on: 43, off: 49 })

/**
 * Blue background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBlue: CharacterOrnament = hitchi({ on: 44, off: 49 })

/**
 * Magenta background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgMagenta: CharacterOrnament = hitchi({ on: 45, off: 49 })

/**
 * Cyan background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgCyan: CharacterOrnament = hitchi({ on: 46, off: 49 })

/**
 * White background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgWhite: CharacterOrnament = hitchi({ on: 47, off: 49 })

/**
 * Black background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgGray: CharacterOrnament = hitchi({ on: 100, off: 49 })

/**
 * Red background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightRed: CharacterOrnament = hitchi({
  on: 101,
  off: 49,
})

/**
 * Green background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightGreen: CharacterOrnament = hitchi({
  on: 102,
  off: 49,
})

/**
 * Yellow background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightYellow: CharacterOrnament = hitchi({
  on: 103,
  off: 49,
})

/**
 * Blue background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightBlue: CharacterOrnament = hitchi({
  on: 104,
  off: 49,
})

/**
 * Magenta background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightMagenta: CharacterOrnament = hitchi({
  on: 105,
  off: 49,
})

/**
 * Cyan background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightCyan: CharacterOrnament = hitchi({
  on: 106,
  off: 49,
})

/**
 * White background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightWhite: CharacterOrnament = hitchi({
  on: 107,
  off: 49,
})
