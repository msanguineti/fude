import * as fude from '../../src'
import { showMe } from './showMe'

export const templateLiterals = (): void =>
  describe('template literals', () => {
    beforeAll(() => {
      // CI/CD need this
      fude.setEnabled(true)
    })

    test('simple', () => {
      const output = fude.bgCyan`background is cyan`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[46mbackground is cyan[49m"`)
    })

    test('nested', () => {
      const output = fude.bgGray`${fude.black`background is gray, text is black with bold and white exclamation mark${fude.bold`${fude.white`!`}`}`}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(
        `"[100m[30mbackground is gray, text is black with bold and white exclamation mark[1m[37m![30m[22m[39m[49m"`
      )
    })

    // const result = `"[41mbgRed[43mbgYellow[49m[41mbgRed[49m"`
    test('using only template literals', () => {
      const output = fude.bgRed`bgRed${
        fude.bgYellow`bgYellow` + fude.bgGreen`bgGreen`
      }bgRed`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[41m[42mbgGreen[41mbgRed[49m"`)
    })

    test('mixing template literals with functions', () => {
      const output = fude.bgRed`bgRed${
        fude.bgYellow('bgYellow') + fude.bgGreen('bgGreen')
      }bgRed`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[41m[42mbgGreen[41mbgRed[49m"`)
    })

    test('mixing functions with template literals', () => {
      const output = fude.bgRed(
        `bgRed${fude.bgYellow`bgYellow${fude.bgGreen('bgGreen')}`}` + 'bgRed'
      )
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[41mbgRed[43mbgYellow[42mbgGreen[43m[41mbgRed[49m"`)
    })

    test('switch off colors in templates', () => {
      const colors = fude.isEnabled()
      fude.setEnabled(false)
      const output = fude.bgWhite`shouldn't go back to ${fude.bgBlack`black`}`
      fude.setEnabled(colors)
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"shouldn't go back to black"`)
    })
  })
