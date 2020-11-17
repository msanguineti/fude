/**
 * 文字装飾 - A ornament to apply to some text
 *
 * @param text the input string
 * @returns the modified input string
 */
export type CharacterOrnament = (text: string) => string

/**
 * 文字装飾コード番号 - The character ornament to apply
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code
 */
export type OrnamentCode = number

/**
 * true if we are in a TTY environment or whatever the user has set FORCE_COLOURS to.
 */
const forceColours = () =>
  process.env.FORCE_COLOURS
    ? /^\s*(true|1|on)\s*$/i.test(process.env.FORCE_COLOURS)
    : process.stdout.isTTY

/**
 * 筆致 - Only apply the given modifier to the input string if we are in a TTY environment or if the FORCE_COLOURS flag is set.
 *
 * @param text the input string
 * @param on the modifier on code
 * @param off the modifier off code
 * @returns a string with the applied modifier
 */
const hitchi = ({ on, off }: { on: number; off: number }) => (text: string) =>
  forceColours() ? `\x1b[${on}m${text}\x1b[${off}m` : text

/**
 * All attributes off.
 *
 * @param text the input string
 */
export const reset: CharacterOrnament = (text: string) =>
  hitchi({ on: 0, off: 0 })(text)

/**
 * Bold or increased intensity.
 *
 * @param text the input string
 */
export const bold: CharacterOrnament = (text: string) =>
  hitchi({ on: 1, off: 22 })(text)

/**
 * Faint or decreased intensity.
 *
 * @param text the input string
 */
export const dim: CharacterOrnament = (text: string) =>
  hitchi({ on: 2, off: 22 })(text)

/**
 * Italic text.
 *
 * @param text the input string
 */
export const italic: CharacterOrnament = (text: string) =>
  hitchi({ on: 3, off: 23 })(text)

/**
 * Underline text.
 *
 * @param text the input string
 */
export const underline: CharacterOrnament = (text: string) =>
  hitchi({ on: 4, off: 24 })(text)

/**
 * Double-Underline text.
 *
 * @param text the input string
 */
export const doublyUnderline: CharacterOrnament = (text: string) =>
  hitchi({ on: 21, off: 24 })(text)

/**
 * Text blinks less than 150 times per minute.
 *
 * (console implementation dependent)
 *
 * @param text the input string
 */
export const blinkSlow: CharacterOrnament = (text: string) =>
  hitchi({ on: 5, off: 25 })(text)

/**
 * Text blinks more than 150 times per minute.
 *
 * (console implementation dependent)
 *
 * @param text the input string
 */
export const blinkFast: CharacterOrnament = (text: string) =>
  hitchi({ on: 6, off: 26 })(text)

/**
 * Reverse / Invert text.
 *
 * Swaps foreground and background colours.
 *
 * @param text the input string
 */
export const invert: CharacterOrnament = (text: string) =>
  hitchi({ on: 7, off: 27 })(text)

/**
 * Conceal / Hide text.
 *
 * @param text the input string
 */
export const hide: CharacterOrnament = (text: string) =>
  hitchi({ on: 8, off: 28 })(text)

/**
 * Crossed-out / Strike-through text.
 *
 * Characters legible but marked as for deletion.
 *
 * @param text the input string
 */
export const strikethrough: CharacterOrnament = (text: string) =>
  hitchi({ on: 9, off: 29 })(text)

/**
 * Black foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const black: CharacterOrnament = (text: string) =>
  hitchi({ on: 30, off: 39 })(text)

/**
 * Red foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const red: CharacterOrnament = (text: string) =>
  hitchi({ on: 31, off: 39 })(text)

/**
 * Green foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const green: CharacterOrnament = (text: string) =>
  hitchi({ on: 32, off: 39 })(text)

/**
 * Yellow foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const yellow: CharacterOrnament = (text: string) =>
  hitchi({ on: 33, off: 39 })(text)

/**
 * Blue foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const blue: CharacterOrnament = (text: string) =>
  hitchi({ on: 34, off: 39 })(text)

/**
 * Magenta foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const magenta: CharacterOrnament = (text: string) =>
  hitchi({ on: 35, off: 39 })(text)

/**
 * Cyan foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const cyan: CharacterOrnament = (text: string) =>
  hitchi({ on: 36, off: 39 })(text)

/**
 * White foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const white: CharacterOrnament = (text: string) =>
  hitchi({ on: 37, off: 39 })(text)

/**
 * Gray (a.k.a. Bright Black) foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const gray: CharacterOrnament = (text: string) =>
  hitchi({ on: 90, off: 39 })(text)

/**
 * Bright Red foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightRed: CharacterOrnament = (text: string) =>
  hitchi({ on: 91, off: 39 })(text)

/**
 * Bright Green foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightGreen: CharacterOrnament = (text: string) =>
  hitchi({ on: 92, off: 39 })(text)

/**
 * Bright Yellow foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightYellow: CharacterOrnament = (text: string) =>
  hitchi({ on: 93, off: 39 })(text)

/**
 * Bright Blue foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightBlue: CharacterOrnament = (text: string) =>
  hitchi({ on: 94, off: 39 })(text)

/**
 * Bright Magenta foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightMagenta: CharacterOrnament = (text: string) =>
  hitchi({ on: 95, off: 39 })(text)

/**
 * Bright Cyan foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightCyan: CharacterOrnament = (text: string) =>
  hitchi({ on: 96, off: 39 })(text)

/**
 * Bright White foreground colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const brightWhite: CharacterOrnament = (text: string) =>
  hitchi({ on: 97, off: 39 })(text)

/**
 * Black background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBlack: CharacterOrnament = (text: string) =>
  hitchi({ on: 40, off: 49 })(text)

/**
 * Red background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgRed: CharacterOrnament = (text: string) =>
  hitchi({ on: 41, off: 49 })(text)

/**
 * Green background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgGreen: CharacterOrnament = (text: string) =>
  hitchi({ on: 42, off: 49 })(text)

/**
 * Yellow background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgYellow: CharacterOrnament = (text: string) =>
  hitchi({ on: 43, off: 49 })(text)

/**
 * Blue background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBlue: CharacterOrnament = (text: string) =>
  hitchi({ on: 44, off: 49 })(text)

/**
 * Magenta background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgMagenta: CharacterOrnament = (text: string) =>
  hitchi({ on: 45, off: 49 })(text)

/**
 * Cyan background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgCyan: CharacterOrnament = (text: string) =>
  hitchi({ on: 46, off: 49 })(text)

/**
 * White background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgWhite: CharacterOrnament = (text: string) =>
  hitchi({ on: 47, off: 49 })(text)

/**
 * Black background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgGray: CharacterOrnament = (text: string) =>
  hitchi({ on: 100, off: 49 })(text)

/**
 * Red background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightRed: CharacterOrnament = (text: string) =>
  hitchi({ on: 101, off: 49 })(text)

/**
 * Green background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightGreen: CharacterOrnament = (text: string) =>
  hitchi({ on: 102, off: 49 })(text)

/**
 * Yellow background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightYellow: CharacterOrnament = (text: string) =>
  hitchi({ on: 103, off: 49 })(text)

/**
 * Blue background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightBlue: CharacterOrnament = (text: string) =>
  hitchi({ on: 104, off: 49 })(text)

/**
 * Magenta background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightMagenta: CharacterOrnament = (text: string) =>
  hitchi({ on: 105, off: 49 })(text)

/**
 * Cyan background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightCyan: CharacterOrnament = (text: string) =>
  hitchi({ on: 106, off: 49 })(text)

/**
 * White background colour.
 *
 * (exact colour #xxxxxx is console implementation dependant - https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 *
 * @param text the input string
 */
export const bgBrightWhite: CharacterOrnament = (text: string) =>
  hitchi({ on: 107, off: 49 })(text)

/** @constant resetCode 	All attributes off*/
export const resetCode: OrnamentCode = 0

/** @constant boldCode  	As with faint/dim, the colour change is a PC (SCO / CGA) invention.*/
export const boldCode: OrnamentCode = 1

/** @constant dimCode  (with a saturated colour). May be implemented as a light font weight like bold.*/
export const dimCode: OrnamentCode = 2

/** @constant italicCode 	Not widely supported. Sometimes treated as inverse or blink.*/
export const italicCode: OrnamentCode = 3

/** @constant underlineCode 	Style extensions exist for Kitty, VTE, mintty and iTerm2.*/
export const underlineCode: OrnamentCode = 4

/** @constant blinkSlowCode 	less than 150 per minute*/
export const blinkSlowCode: OrnamentCode = 5

/** @constant blinkRapidCode 	MS-DOS ANSI.SYS, 150+ per minute; not widely supported*/
export const blinkRapidCode: OrnamentCode = 6

/** @constant inverseCode 	swap foreground and background colours, aka invert; inconsistent emulation*/
export const inverseCode: OrnamentCode = 7

/** @constant hideCode  not widely supported.*/
export const hideCode: OrnamentCode = 8

/** @constant strikethroughCode  characters legible but marked as if for deletion.*/
export const strikethroughCode: OrnamentCode = 9

/** @constant defaultFontCode  Primary (default) font*/
export const defaultFontCode: OrnamentCode = 10

/** @constant altFont1Code: Alternative font */
export const altFont1Code: OrnamentCode = 11

/** @constant altFont2Code: Alternative font */
export const altFont2Code: OrnamentCode = 12

/** @constant altFont3Code: Alternative font */
export const altFont3Code: OrnamentCode = 13

/** @constant altFont4Code: Alternative font */
export const altFont4Code: OrnamentCode = 14

/** @constant altFont5Code: Alternative font */
export const altFont5Code: OrnamentCode = 15

/** @constant altFont6Code: Alternative font */
export const altFont6Code: OrnamentCode = 16

/** @constant altFont7Code: Alternative font */
export const altFont7Code: OrnamentCode = 17

/** @constant altFont8Code: Alternative font */
export const altFont8Code: OrnamentCode = 18

/** @constant altFont9Code: Alternative font */
export const altFont9Code: OrnamentCode = 19

/** @constant frakturCode  Rarely supported*/
export const frakturCode: OrnamentCode = 20

/** @constant doublyUnderlineCode  Doubly underline or Bold off 	Double-underline per ECMA-48.:8.3.117 See discussion*/
export const doublyUnderlineCode: OrnamentCode = 21

/** @constant normalColorCode  Normal colour or intensity 	Neither bold nor faint/dim*/
export const normalColorCode: OrnamentCode = 22

/** @constant resetItalicCode Not italic, not Fraktur*/
export const resetItalicCode: OrnamentCode = 23

/** @constant resetUnderlineCode  Underline off 	Not singly or doubly underlined*/
export const resetUnderlineCode: OrnamentCode = 24

/** @constant resetBlinkCode  Blink off*/
export const resetBlinkCode: OrnamentCode = 25

/** @constant propSpacingCode Proportional spacing 	ITU T.61 and T.416, not known to be used on terminals*/
export const propSpacingCode: OrnamentCode = 26

/** @constant resetInverseCode Reverse/invert off*/
export const resetInverseCode: OrnamentCode = 27

/** @constant resetHideCode Reveal 	conceal/hide off*/
export const resetHideCode: OrnamentCode = 28

/** @constant resetStrikethroughCode Not crossed out*/
export const resetStrikethroughCode: OrnamentCode = 29

/** @constant blackCode Set foreground colour*/
export const blackCode: OrnamentCode = 30

/** @constant redCode see above*/
export const redCode: OrnamentCode = 31

/** @constant greenCode see above*/
export const greenCode: OrnamentCode = 32

/** @constant yellowCode see above*/
export const yellowCode: OrnamentCode = 33

/** @constant blueCode see above*/
export const blueCode: OrnamentCode = 34

/** @constant magentaCode see above*/
export const magentaCode: OrnamentCode = 35

/** @constant cyanCode see above*/
export const cyanCode: OrnamentCode = 36

/** @constant whiteCode see above*/
export const whiteCode: OrnamentCode = 37

/** @constant resetFgCode Default foreground colour 	implementation defined (according to standard)*/
export const resetFgCode: OrnamentCode = 39

/** @constant blackBgCode Set background colour*/
export const blackBgCode: OrnamentCode = 40

/** @constant redBgCode see above*/
export const redBgCode: OrnamentCode = 41

/** @constant greenBgCode see above*/
export const greenBgCode: OrnamentCode = 42

/** @constant yellowBgCode see above*/
export const yellowBgCode: OrnamentCode = 43

/** @constant blueBgCode see above*/
export const blueBgCode: OrnamentCode = 44

/** @constant magentaBgCode see above*/
export const magentaBgCode: OrnamentCode = 45

/** @constant cyanBgCode see above*/
export const cyanBgCode: OrnamentCode = 46

/** @constant whiteBgCode see above*/
export const whiteBgCode: OrnamentCode = 47

/** @constant resetBgCode Default background colour 	implementation defined (according to standard)*/
export const resetBgCode: OrnamentCode = 49

/** @constant resetPropSpacingCode Disable proportional spacing 	T.61 and T.416*/
export const resetPropSpacingCode: OrnamentCode = 50

/** @constant framedCode 	Implemented as "emoji variation selector" in mintty.*/
export const framedCode: OrnamentCode = 51

/** @constant encircledCode see above*/
export const encircledCode: OrnamentCode = 52

/** @constant overlinedCode see above*/
export const overlinedCode: OrnamentCode = 53

/** @constant resetFramedCode  Not framed or encircled*/
export const resetFramedCode: OrnamentCode = 54

/** @constant resetOverlinesCode Not overlined*/
export const resetOverlinesCode: OrnamentCode = 55

/** @constant ideogramUCode ideogram underline or right side line 	Rarely supported*/
export const ideogramUCode: OrnamentCode = 60

/** @constant ideogramDUCode ideogram double underline or  double line on the right side*/
export const ideogramDUCode: OrnamentCode = 61

/** @constant ideogramOCode ideogram overline or left side line*/
export const ideogramOCode: OrnamentCode = 62

/** @constant ideogramDOCode ideogram double overline or  double line on the left side*/
export const ideogramDOCode: OrnamentCode = 63

/** @constant ideogramSCode ideogram stress marking*/
export const ideogramSCode: OrnamentCode = 64

/** @constant ideogramOffCode ideogram attributes off 	reset the effects of all of 60–64*/
export const ideogramOffCode: OrnamentCode = 65

/** @constant superscriptCode mintty (not in standard)*/
export const superscriptCode: OrnamentCode = 73

/** @constant subscriptCode see above*/
export const subscriptCode: OrnamentCode = 74

/** @constant grayCode  Set bright foreground colour 	aixterm (not in standard)*/
export const grayCode: OrnamentCode = 90

/** @constant brightRedCode see above*/
export const brightRedCode: OrnamentCode = 91

/** @constant brightGreenCode see above*/
export const brightGreenCode: OrnamentCode = 92

/** @constant brightYellowCode see above*/
export const brightYellowCode: OrnamentCode = 93

/** @constant brightBlueCode see above*/
export const brightBlueCode: OrnamentCode = 94

/** @constant brightMagentaCode see above*/
export const brightMagentaCode: OrnamentCode = 95

/** @constant brightCyanCode see above*/
export const brightCyanCode: OrnamentCode = 96

/** @constant brightWhiteCode see above*/
export const brightWhiteCode: OrnamentCode = 97

/** @constant brightBlackBgCode Set bright background colour*/
export const brightBlackBgCode: OrnamentCode = 100

/** @constant brightRedBgCode see above*/
export const brightRedBgCode: OrnamentCode = 101

/** @constant brightGreenBgCode see above*/
export const brightGreenBgCode: OrnamentCode = 102

/** @constant brightYellowBgCode see above*/
export const brightYellowBgCode: OrnamentCode = 103

/** @constant brightBlueBgCode see above*/
export const brightBlueBgCode: OrnamentCode = 104

/** @constant brightMagentaBgCode see above*/
export const brightMagentaBgCode: OrnamentCode = 105

/** @constant brightCyanBgCode see above*/
export const brightCyanBgCode: OrnamentCode = 106

/** @constant brightWhiteBgCode see above*/
export const brightWhiteBgCode: OrnamentCode = 107

/**
 *
 * @param text the input string
 * @param tos the ornament codes to apply to the input
 */
export const fudeCodes = (text: string, ...tos: OrnamentCode[]): string =>
  tos.reduce((p, v) => hitchi({ on: v, off: 0 })(p), text)

/**
 * Prints what is available on your TTY
 */
export const availableOrnamentCodes = (): string => {
  const output = []

  for (let i = 0; i < 109; i++) {
    const text = `${hitchi({ on: i, off: 0 })(String(i).padStart(3))}${
      (i + 1) % 10 === 0 ? '\n' : ' '
    }`
    output.push(text)
  }

  return output.join('')
}
