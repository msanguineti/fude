import { showMe } from './showMe'

export const environment = (): void =>
  describe('environment', () => {
    test('FORCE_COLOR on envar', () => {
      process.env.FORCE_COLOR = 'on'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const f = require('../../src')
      const output = f.fude('this text should be red', f.red)
      expect(output).toMatchInlineSnapshot(`"[31mthis text should be red[39m"`)
      showMe(output)
    })

    test('FORCE_COLOR off envar', () => {
      process.env.FORCE_COLOR = 'off'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const f = require('../../src')
      const output = f.fude("this text shouldn't be red", f.red)
      expect(output).toMatchInlineSnapshot(`"this text shouldn't be red"`)
      showMe(output)
    })

    test('simulate headless for full coverage', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const f = require('../../src')
      const output = f.fude("it isn't going to fail in ci", f.red)
      showMe(output)

      if (!process.stdout.isTTY)
        expect(output).toMatch("it isn't going to fail in ci")
      else expect(output).toMatch("[31mit isn't going to fail in ci[39m")
    })
  })
