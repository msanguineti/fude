import * as fude from '../../src'
import { showMe } from './showMe'

export const misc = (): void =>
  describe('misc', () => {
    test('simulate headless for full coverage', () => {
      delete process.env.FORCE_COLORS
      const output = fude.fude("it isn't going to fail in ci", fude.red)
      showMe(output)

      if (!process.stdout.isTTY)
        expect(output).toMatch("it isn't going to fail in ci")
      else expect(output).toMatch("[31mit isn't going to fail in ci[39m")
    })
  })
