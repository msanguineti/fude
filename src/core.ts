import { OrnamentCode } from './codes'
import { CharacterOrnament } from './ornaments'

/**
 * This code was taken from Kleur (https://github.com/lukeed/kleur) and adapted for our use case.
 *
 * FORCE_COLOR should decide whether to force colors or not.
 */
const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env
const isTTY = process.stdout && process.stdout.isTTY
let enabled = FORCE_COLOR
  ? !/^\s*(?:false|0|off)\s*$/i.test(FORCE_COLOR)
  : !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && isTTY

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
        (ret.indexOf(opt.close) >= 0 ? ret.replace(opt.rgx, opt.open) : ret) +
        opt.close
    : ret
}
/**
 * 筆致 - Only apply the given attribute to the input string if we are in a TTY environment or if the FORCE_COLOR flag is set.
 *
 * @param text the input string
 * @param on the attribute on code
 * @param off the attribute off code
 * @returns a string with the applied attribute
 */
export const hitchi = (
  on: OrnamentCode,
  off: OrnamentCode = 0
): ((...text: string[]) => string) => {
  const opt = {
    open: `\x1b[${on}m`,
    close: `\x1b[${off}m`,
    rgx: new RegExp(`\\x1b\\[(?:${off})m`, 'gi'),
  }
  return (txt, ...keys): string =>
    keys.length !== 0
      ? templates(txt, keys, opt)
      : enabled
      ? opt.open +
        (txt.indexOf(opt.close) >= 0 ? txt.replace(opt.rgx, opt.open) : txt) +
        opt.close
      : txt + ''
}

/**
 * 筆 - Takes a string and applies the specified text ornaments to it.
 *
 * @param text the input string
 * @param tos text ornaments to apply
 */
export const fude = (text: string, ...tos: CharacterOrnament[]): string =>
  tos.reduceRight((v, f) => f(v), text as string)

const closeAttribute = {
  0: 0,
  1: 22,
  2: 22,
  3: 23,
  4: 24,
  21: 24,
  5: 25,
  6: 26,
  7: 27,
  8: 28,
  9: 29,
  11: 10,
  12: 10,
  13: 10,
  14: 10,
  15: 10,
  16: 10,
  17: 10,
  18: 10,
  19: 10,
  20: 23,
  26: 50,
  30: 39,
  31: 39,
  32: 39,
  33: 39,
  34: 39,
  35: 39,
  36: 39,
  37: 39,
  38: 39,
  40: 49,
  41: 49,
  42: 49,
  43: 49,
  44: 49,
  45: 49,
  46: 49,
  47: 49,
  48: 49,
  51: 54,
  52: 54,
  53: 55,
  58: 59,
  60: 65,
  61: 65,
  62: 65,
  63: 65,
  64: 65,
  73: 10,
  74: 10,
  90: 39,
  91: 39,
  92: 39,
  93: 39,
  94: 39,
  95: 39,
  96: 39,
  97: 39,
  100: 49,
  101: 49,
  102: 49,
  103: 49,
  104: 49,
  105: 49,
  106: 49,
  107: 49,
}

/**
 * Pass ANSI SGR attributes codes directly
 *
 * @param text the input string
 * @param codes the OrnamentCode codes to apply to the input
 */
export const ansi = (text: string, ...codes: OrnamentCode[]): string => {
  for (let i = 0; i < codes.length; i++) {
    const element = codes[i]

    text = hitchi(element, closeAttribute[element])(text)
  }

  return text
}

const applyRGB = (
  r: number,
  g: number,
  b: number,
  text: string,
  open,
  close
): string =>
  enabled
    ? hitchi(
        (`${open};${2};${r};${g};${b}` as unknown) as number,
        close
      )(text as string)
    : (text as string)

const openRGBColorsAttribute = 38
const closeRGBColorsAttribute = 39

/**
 * Apply an RGB foreground color to the given input text.
 *
 * @param text the input string
 * @param r red color value (0-255) default 0
 * @param g green color value (0-255) default 0
 * @param b blue color attribute (0-255) default 0
 */
export const rgb = (
  text: string,
  { r = 0, g = 0, b = 0 }: { r?: number; g?: number; b?: number }
): string =>
  applyRGB(r, g, b, text, openRGBColorsAttribute, closeRGBColorsAttribute)

const openRGBBGColorsAttribute = 48
const closeRGBBGColorsAttribute = 49

/**
 * Apply an RGB background color to the given input text.
 *
 * @param text the input string
 * @param r red color value (0-255) default 0
 * @param g green color value (0-255) default 0
 * @param b blue color attribute (0-255) default 0
 */
export const rgbBg = (
  text: string,
  { r = 0, g = 0, b = 0 }: { r?: number; g?: number; b?: number }
): string =>
  applyRGB(r, g, b, text, openRGBBGColorsAttribute, closeRGBBGColorsAttribute)

const openRGBUnderlineColorsAttribute = 58
const closeRGBUnderlineColorsAttribute = 59

/**
 * Apply an RGB color to the underline of the given input text.
 *
 * @param text the input string
 * @param r red color value (0-255) default 0
 * @param g green color value (0-255) default 0
 * @param b blue color attribute (0-255) default 0
 * @param double doubly underline default to `false`
 */
export const rgbUnderline = (
  text: string,
  {
    r = 0,
    g = 0,
    b = 0,
    double = false,
  }: { r?: number; g?: number; b?: number; double?: boolean }
): string =>
  applyRGB(
    r,
    g,
    b,
    double ? hitchi(21, 24)(text as string) : hitchi(4, 24)(text as string),
    openRGBUnderlineColorsAttribute,
    closeRGBUnderlineColorsAttribute
  )

const hexToRGB = (hexValue: string) => {
  switch (hexValue.length) {
    case 3:
      return {
        r: +`0x${hexValue[0]}${hexValue[0]}`,
        g: +`0x${hexValue[1]}${hexValue[1]}`,
        b: +`0x${hexValue[2]}${hexValue[2]}`,
      }
    case 4:
      return {
        r: +`0x${hexValue[1]}${hexValue[1]}`,
        g: +`0x${hexValue[2]}${hexValue[2]}`,
        b: +`0x${hexValue[3]}${hexValue[3]}`,
      }
    case 6:
      return {
        r: +`0x${hexValue[0]}${hexValue[1]}`,
        g: +`0x${hexValue[2]}${hexValue[3]}`,
        b: +`0x${hexValue[4]}${hexValue[5]}`,
      }
    case 7:
      return {
        r: +`0x${hexValue[1]}${hexValue[2]}`,
        g: +`0x${hexValue[3]}${hexValue[4]}`,
        b: +`0x${hexValue[5]}${hexValue[6]}`,
      }
  }
}

/**
 * Apply a HEX foreground color value to the given input text.
 *
 * Case insensitive, with or without `#` as a prefix, both in long (FFFFFF) and short (FFF) form.
 *
 * @param text the input string
 * @param hexValue the hex color value
 */
export const hex = (text: string, hexValue: string): string => {
  const { r, g, b } = hexToRGB(hexValue)

  return applyRGB(
    r,
    g,
    b,
    text,
    openRGBColorsAttribute,
    closeRGBColorsAttribute
  )
}

/**
 * Apply a HEX background color value to the given input text.
 *
 * Case insensitive, with or without `#` as a prefix, both in long (FFFFFF) and short (FFF) form.
 *
 * @param text the input string
 * @param hexValue the hex color value
 */
export const hexBg = (text: string, hexValue: string): string => {
  const { r, g, b } = hexToRGB(hexValue)

  return applyRGB(
    r,
    g,
    b,
    text,
    openRGBBGColorsAttribute,
    closeRGBBGColorsAttribute
  )
}

/**
 * Apply a HEX color value to the underline of the given input text.
 *
 * Case insensitive, with or without `#` as a prefix, both in long (FFFFFF) and short (FFF) form.
 *
 * @param text the input string
 * @param hexValue the hex color value
 */
export const hexUnderline = (
  text: string,
  hexValue: string,
  double = false
): string => {
  const { r, g, b } = hexToRGB(hexValue)

  return applyRGB(
    r,
    g,
    b,
    double ? hitchi(21, 24)(text as string) : hitchi(4, 24)(text as string),
    openRGBUnderlineColorsAttribute,
    closeRGBUnderlineColorsAttribute
  )
}
