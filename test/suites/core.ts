import * as fude from '../../src'
import { showMe } from './showMe'

export const core = (): void =>
  describe('core functionalities', () => {
    beforeAll(() => {
      // CI/CD need this
      fude.setEnabled(true)
    })

    test('single ornament', () => {
      const output = fude.fude('red', fude.red)
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[31mred[39m"`)
    })

    test('two ornaments together', () => {
      const output = fude.fude('bold red', fude.red, fude.bold)
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[31m[1mbold red[22m[39m"`)
    })

    test('ornaments string + string', () => {
      const output =
        fude.fude("i'm bold", fude.bold) + ' ' + fude.fude("i'm red", fude.red)
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[1mi'm bold[22m [31mi'm red[39m"`)
    })

    test('ornaments template strings', () => {
      const output = `${fude.fude('The', fude.dim)} ${fude.fude(
        'leaning',
        fude.italic,
        fude.green
      )} ${fude.fude('tower', fude.white)} ${fude.fude(
        'of',
        fude.dim
      )} ${fude.fude('Pisa', fude.red, fude.blinkSlow)}`
      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[2mThe[22m [3m[32mleaning[39m[23m [37mtower[39m [2mof[22m [31m[5mPisa[25m[39m"`)
    })

    test('enabled toggle', () => {
      const colors = fude.isEnabled()
      fude.setEnabled(false)
      const off = fude.fude("this text shouldn't be red", fude.red)
      expect(off).toMatchInlineSnapshot(`"this text shouldn't be red"`)
      showMe(off)
      fude.setEnabled(true)
      const on = fude.fude('this text should be red', fude.red)
      expect(on).toMatchInlineSnapshot(`"[31mthis text should be red[39m"`)
      showMe(on)
      fude.setEnabled(colors)
    })
  })
