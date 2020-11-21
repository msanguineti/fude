import * as fude from '../../src'

export const readmeExamples = (): void =>
  describe('readme', () => {
    test('usage examples', () => {
      const output1 =
        fude.fude('筆', fude.bgRed, fude.white) +
        fude.fude(' fude ', fude.bgWhite, fude.black)

      // alternatively...
      const output2 =
        fude.bgRed(fude.white`筆`) + fude.bgWhite(fude.black` fude `)

      // template literals
      const output3 =
        fude.bgRed`${fude.white`筆`}` + fude.bgWhite`${fude.black` fude `}`

      expect(output1).toMatchInlineSnapshot(`"[41m[37m筆[39m[49m[47m[30m fude [39m[49m"`)
      expect(output1).toMatch(output2)
      expect(output3).toMatch(output1)

      // or nested (same result, slightly different intentions with the backgrounds)...
      const output4 = fude.bgRed(
        fude.white('筆') + fude.bgWhite(` ${fude.black('fude')} `)
      )

      // template literals (also nested)...
      const output5 = fude.bgRed`${fude.white`筆`}${fude.bgWhite` ${fude.black`fude`} `}`

      expect(output4).toMatch(output5)
    })
  })
