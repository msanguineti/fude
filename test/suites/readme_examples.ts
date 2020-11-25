import * as fude from '../../src'

export const readmeExamples = (): void =>
  describe('readme', () => {
    beforeAll(() => {
      // CI/CD need this
      fude.setEnabled(true)
    })

    test('usage examples', () => {
      const ex1 =
        fude.fude('筆', fude.bgRed, fude.white) +
        fude.fude(' fude ', fude.bgWhite, fude.black)

      // alternatively...
      const ex2 = fude.bgRed(fude.white`筆`) + fude.bgWhite(fude.black` fude `)

      // template literals
      const ex3 =
        fude.bgRed`${fude.white`筆`}` + fude.bgWhite`${fude.black` fude `}`

      expect(ex1).toMatchInlineSnapshot(`"[41m[37m筆[39m[49m[47m[30m fude [39m[49m"`)
      expect(ex1).toMatch(ex2)
      expect(ex3).toMatch(ex1)

      // or nested (same result, slightly different intentions with the backgrounds)...
      const ex4 = fude.bgRed(
        fude.white('筆') + fude.bgWhite(` ${fude.black('fude')} `)
      )

      // template literals (also nested)...
      const ex5 = fude.bgRed`${fude.white`筆`}${fude.bgWhite` ${fude.black`fude`} `}`

      expect(ex4).toMatch(ex5)
    })

    test('api examples', () => {
      const ex1 = fude.fude(
        'red text on white background',
        fude.bgWhite,
        fude.red
      )

      const ex2 = fude.bgWhite(fude.red('red text on white background'))

      expect(ex1).toMatch(ex2)
      expect(ex1).toMatchInlineSnapshot(`"[47m[31mred text on white background[39m[49m"`)

      const ex3 = `${fude.red`red text`} and ${fude.bgWhite`${fude.blue`blue text on white background`}`}`

      const ex4 =
        `${fude.red`red text`}` +
        ' and ' +
        `${fude.bgWhite(fude.blue`blue text on white background`)}`

      expect(ex3).toMatch(ex4)
      expect(ex3).toMatchInlineSnapshot(
        `"[31mred text[39m and [47m[34mblue text on white background[39m[49m"`
      )
    })
  })
