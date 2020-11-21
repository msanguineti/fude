import * as fude from '../../src'
import { showMe } from './showMe'

export const templateLiterals = (): void =>
  describe('template literals', () => {
    test('simple', () => {
      const output = fude.bgCyan`background is cyan`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[46mbackground is cyan[49m"`)
    })

    test('nested', () => {
      const output = fude.bgGray`${fude.black`background is gray, text is black with bold and white exclamation mark${fude.bold`${fude.white`!`}`}`}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[100m[30mbackground is gray, text is black with bold and white exclamation mark[1m[37m![39m[30m[22m[39m[49m"`
      )
    })

    // const result = `"[41mbgRed[43mbgYellow[49m[41mbgRed[49m"`
    test('using only template literals', () => {
      const output = fude.bgRed`bgRed${
        fude.bgYellow`bgYellow` + fude.bgGreen`bgGreen`
      }bgRed`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[49m[41m[42mbgGreen[49m[41mbgRed[49m"`)
    })

    test('mixing template literals with functions', () => {
      const output = fude.bgRed`bgRed${
        fude.bgYellow('bgYellow') + fude.bgGreen('bgGreen')
      }bgRed`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[49m[41m[42mbgGreen[49m[41mbgRed[49m"`)
    })

    test('mixing functions with template literals', () => {
      const output = fude.bgRed(
        `bgRed${fude.bgYellow`bgYellow${fude.bgGreen('bgGreen')}`}` + 'bgRed'
      )
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[42mbgGreen[49m[41m[43m[49m[41mbgRed[49m"`)
    })
  })
