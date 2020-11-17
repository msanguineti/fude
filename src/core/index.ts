import { CharacterOrnament } from '../ornaments'

/**
 * 書く - composes the various text ornaments to obtain the final output string
 *
 * @param tos set of text ornaments
 * @param text the input string
 * @returns a string with the applied text ornaments
 */
const kaku = (tos: CharacterOrnament[]) => (text: string) =>
  tos.reduceRight((v, f) => f(v), text)

/**
 * 筆 - Takes a string and applies the specified text ornaments to it.
 *
 * @param text the input string
 * @param tos text ornaments to apply
 */
export const fude = (text: string, ...tos: CharacterOrnament[]): string =>
  kaku(tos)(text)
