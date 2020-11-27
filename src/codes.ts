/**
 * 文字装飾コード番号 - The character OrnamentCode (SGR Parameter) to apply
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters
 */

export type OrnamentCode = number

/** @constant reset. All attributes off.*/
export const resetCode: OrnamentCode = 0

/** @constant bold. As with faint/dim, the color change is a PC (SCO / CGA) invention.*/
export const boldCode: OrnamentCode = 1

/** @constant dim  (with a saturated color). May be implemented as a light font weight like bold.*/
export const dimCode: OrnamentCode = 2

/** @constant italic. Not widely supported.. Sometimes treated as inverse or blink.*/
export const italicCode: OrnamentCode = 3

/** @constant underline.. Style extensions exist for Kitty, VTE, mintty and iTerm2.*/
export const underlineCode: OrnamentCode = 4

/** @constant blinkSlow; less than 150 per minute.*/
export const blinkSlowCode: OrnamentCode = 5

/** @constant blinkRapid. MS-DOS ANSI.SYS, 150+ per minute; not widely supported.*/
export const blinkRapidCode: OrnamentCode = 6

/** @constant invert; swap foreground and background colors; inconsistent emulation.*/
export const invertCode: OrnamentCode = 7

/** @constant hide; not widely supported.*/
export const hideCode: OrnamentCode = 8

/** @constant strikethrough. Characters legible but marked as if for deletion.*/
export const strikethroughCode: OrnamentCode = 9

/** @constant defaultFont. Primary (default) font.*/
export const defaultFontCode: OrnamentCode = 10

/** @constant altFont1Code: alternative font */
export const altFont1Code: OrnamentCode = 11

/** @constant altFont2Code: alternative font */
export const altFont2Code: OrnamentCode = 12

/** @constant altFont3Code: alternative font */
export const altFont3Code: OrnamentCode = 13

/** @constant altFont4Code: alternative font */
export const altFont4Code: OrnamentCode = 14

/** @constant altFont5Code: alternative font */
export const altFont5Code: OrnamentCode = 15

/** @constant altFont6Code: alternative font */
export const altFont6Code: OrnamentCode = 16

/** @constant altFont7Code: alternative font */
export const altFont7Code: OrnamentCode = 17

/** @constant altFont8Code: alternative font */
export const altFont8Code: OrnamentCode = 18

/** @constant altFont9Code: alternative font */
export const altFont9Code: OrnamentCode = 19

/** @constant fraktur. Rarely supported.*/
export const frakturCode: OrnamentCode = 20

/** @constant doublyUnderline. Doubly underline or Bold off. Double-underline per ECMA-48.:8.3.117. See discussion.*/
export const doublyUnderlineCode: OrnamentCode = 21

/** @constant normalColor. Normal color or intensity. Neither bold nor faint/ dim.*/
export const normalColorCode: OrnamentCode = 22

/** @constant resetItalic Not italic, not Fraktur.*/
export const resetItalicCode: OrnamentCode = 23

/** @constant resetUnderline. Underline off. Not singly or doubly underlined.*/
export const resetUnderlineCode: OrnamentCode = 24

/** @constant resetBlink. Blink off.*/
export const resetBlinkCode: OrnamentCode = 25

/** @constant propSpacing Proportional spacing. ITU T.61 and T.416, not known to be used on terminals.*/
export const propSpacingCode: OrnamentCode = 26

/** @constant resetInverse Reverse/invert off.*/
export const resetInverseCode: OrnamentCode = 27

/** @constant resetHide Reveal; conceal/hide off.*/
export const resetHideCode: OrnamentCode = 28

/** @constant resetStrikethrough Not crossed out.*/
export const resetStrikethroughCode: OrnamentCode = 29

/** @constant black. Set foreground color.*/
export const blackCode: OrnamentCode = 30

/** @constant red. Set foreground color.*/
export const redCode: OrnamentCode = 31

/** @constant green. Set foreground color.*/
export const greenCode: OrnamentCode = 32

/** @constant yellow. Set foreground color.*/
export const yellowCode: OrnamentCode = 33

/** @constant blue. Set foreground color.*/
export const blueCode: OrnamentCode = 34

/** @constant magenta. Set foreground color.*/
export const magentaCode: OrnamentCode = 35

/** @constant cyan. Set foreground color.*/
export const cyanCode: OrnamentCode = 36

/** @constant white. Set foreground color.*/
export const whiteCode: OrnamentCode = 37

/** @constant resetForeground Default foreground color; implementation defined (according to standard).*/
export const resetForegroundCode: OrnamentCode = 39

/** @constant bgBlack. Set background color.*/
export const bgBlackCode: OrnamentCode = 40

/** @constant bgRed. Set background color.*/
export const bgRedCode: OrnamentCode = 41

/** @constant bgGreen. Set background color.*/
export const bgGreenCode: OrnamentCode = 42

/** @constant bgYellow. Set background color.*/
export const bgYellowCode: OrnamentCode = 43

/** @constant bgBlue. Set background color.*/
export const bgBlueCode: OrnamentCode = 44

/** @constant bgMagenta. Set background color.*/
export const bgMagentaCode: OrnamentCode = 45

/** @constant bgCyan. Set background color.*/
export const bgCyanCode: OrnamentCode = 46

/** @constant bgWhite. Set background color.*/
export const bgWhiteCode: OrnamentCode = 47

/** @constant bgReset Default background color; implementation defined (according to standard).*/
export const resetBackgroundCode: OrnamentCode = 49

/** @constant resetPropSpacing Disable proportional spacing. T.61 and T.416*/
export const resetPropSpacingCode: OrnamentCode = 50

/** @constant framed. Implemented as "emoji variation selector" in mintty.*/
export const framedCode: OrnamentCode = 51

/** @constant encircled Implemented as "emoji variation selector" in mintty.*/
export const encircledCode: OrnamentCode = 52

/** @constant overlined Implemented as "emoji variation selector" in mintty.*/
export const overlinedCode: OrnamentCode = 53

/** @constant resetFramed. Not framed or encircled.*/
export const resetFramedCode: OrnamentCode = 54

/** @constant resetOverlines Not overlined.*/
export const resetOverlinesCode: OrnamentCode = 55

/** @constant ideogramU ideogram underline or right side line. Rarely supported.*/
export const ideogramUCode: OrnamentCode = 60

/** @constant ideogramDU ideogram double underline on; double line on the right side.*/
export const ideogramDUCode: OrnamentCode = 61

/** @constant ideogramO ideogram overline or left side line.*/
export const ideogramOCode: OrnamentCode = 62

/** @constant ideogramDO ideogram double overline on; double line on the left side.*/
export const ideogramDOCode: OrnamentCode = 63

/** @constant ideogramS ideogram stress marking.*/
export const ideogramSCode: OrnamentCode = 64

/** @constant ideogramOff ideogram attributes off; reset the effects of all of 60–64*/
export const ideogramOffCode: OrnamentCode = 65

/** @constant superscript mintty (not in standard).*/
export const superscriptCode: OrnamentCode = 73

/** @constant subscript mintty (not in standard).*/
export const subscriptCode: OrnamentCode = 74

/** @constant gray.. Set bright foreground color; aixterm (not in standard).*/
export const grayCode: OrnamentCode = 90

/** @constant brightRed. Set bright foreground color; aixterm (not in standard).*/
export const brightRedCode: OrnamentCode = 91

/** @constant brightGreen. Set bright foreground color; aixterm (not in standard).*/
export const brightGreenCode: OrnamentCode = 92

/** @constant brightYellow. Set bright foreground color; aixterm (not in standard).*/
export const brightYellowCode: OrnamentCode = 93

/** @constant brightBlue. Set bright foreground color; aixterm (not in standard).*/
export const brightBlueCode: OrnamentCode = 94

/** @constant brightMagenta. Set bright foreground color; aixterm (not in standard).*/
export const brightMagentaCode: OrnamentCode = 95

/** @constant brightCyan. Set bright foreground color; aixterm (not in standard).*/
export const brightCyanCode: OrnamentCode = 96

/** @constant brightWhite. Set bright foreground color; aixterm (not in standard).*/
export const brightWhiteCode: OrnamentCode = 97

/** @constant bgBrightBlack. Set bright background color.*/
export const bgBrightBlackCode: OrnamentCode = 100

/** @constant bgBrightRed. Set bright background color.*/
export const bgBrightRedCode: OrnamentCode = 101

/** @constant bgBrightGreen. Set bright background color.*/
export const bgBrightGreenCode: OrnamentCode = 102

/** @constant bgBrightYellow. Set bright background color.*/
export const bgBrightYellowCode: OrnamentCode = 103

/** @constant bgBrightBlue. Set bright background color.*/
export const bgBrightBlueCode: OrnamentCode = 104

/** @constant bgBrightMagenta. Set bright background color.*/
export const bgBrightMagentaCode: OrnamentCode = 105

/** @constant bgBrightCyan. Set bright background color.*/
export const bgBrightCyanCode: OrnamentCode = 106

/** @constant bgBrightWhite. Set bright background color.*/
export const bgBrightWhiteCode: OrnamentCode = 107

/**
 * Prints what is available on your TTY
 */
export const ttyCapability = (): string => {
  const output = []

  for (let i = 0; i < 109; i++) {
    const text = `\x1b[${i}m${(i + '').padStart(3)}\x1b[0m${
      (i + 1) % 10 === 0 ? '\n' : ' '
    }`
    output.push(text)
  }

  return output.join('')
}
