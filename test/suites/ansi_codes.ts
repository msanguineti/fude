import * as fude from '../../src'

import { showMe } from './showMe'

export const ansi_codes = (): void =>
  describe('ANSI Codes', () => {
    beforeAll(() => {
      // CI/CD need this
      fude.setEnabled(true)
    })

    test('TTY capability', () => {
      const output = fude.ttyCapability()
      showMe(output)

      expect(output).toMatchInlineSnapshot(`
        "[0m  0[0m [1m  1[0m [2m  2[0m [3m  3[0m [4m  4[0m [5m  5[0m [6m  6[0m [7m  7[0m [8m  8[0m [9m  9[0m
        [10m 10[0m [11m 11[0m [12m 12[0m [13m 13[0m [14m 14[0m [15m 15[0m [16m 16[0m [17m 17[0m [18m 18[0m [19m 19[0m
        [20m 20[0m [21m 21[0m [22m 22[0m [23m 23[0m [24m 24[0m [25m 25[0m [26m 26[0m [27m 27[0m [28m 28[0m [29m 29[0m
        [30m 30[0m [31m 31[0m [32m 32[0m [33m 33[0m [34m 34[0m [35m 35[0m [36m 36[0m [37m 37[0m [38m 38[0m [39m 39[0m
        [40m 40[0m [41m 41[0m [42m 42[0m [43m 43[0m [44m 44[0m [45m 45[0m [46m 46[0m [47m 47[0m [48m 48[0m [49m 49[0m
        [50m 50[0m [51m 51[0m [52m 52[0m [53m 53[0m [54m 54[0m [55m 55[0m [56m 56[0m [57m 57[0m [58m 58[0m [59m 59[0m
        [60m 60[0m [61m 61[0m [62m 62[0m [63m 63[0m [64m 64[0m [65m 65[0m [66m 66[0m [67m 67[0m [68m 68[0m [69m 69[0m
        [70m 70[0m [71m 71[0m [72m 72[0m [73m 73[0m [74m 74[0m [75m 75[0m [76m 76[0m [77m 77[0m [78m 78[0m [79m 79[0m
        [80m 80[0m [81m 81[0m [82m 82[0m [83m 83[0m [84m 84[0m [85m 85[0m [86m 86[0m [87m 87[0m [88m 88[0m [89m 89[0m
        [90m 90[0m [91m 91[0m [92m 92[0m [93m 93[0m [94m 94[0m [95m 95[0m [96m 96[0m [97m 97[0m [98m 98[0m [99m 99[0m
        [100m100[0m [101m101[0m [102m102[0m [103m103[0m [104m104[0m [105m105[0m [106m106[0m [107m107[0m [108m108[0m "
      `)
    })

    test('using codes', () => {
      const output = fude.ansi(
        'black on bright red background',
        fude.bgBrightRedCode,
        fude.blackCode
      )
      showMe(output)
      // `"[101;30mblack on bright red background[0m"`
      expect(output).toMatchInlineSnapshot(`"[30m[101mblack on bright red background[49m[39m"`)
    })

    test('passing ornaments functions', () => {
      const output = fude.ansi(
        `white on bright green and ${fude.italic(
          fude.bold('italic, bold and white on bright green background')
        )}`,
        fude.bgBrightGreenCode,
        fude.whiteCode
      )

      showMe(output)

      // `"[102;37mwhite on bright green and [3m[1mitalic, bold and white on bright green background[0m"`
      expect(output).toMatchInlineSnapshot(
        `"[37m[102mwhite on bright green and [3m[1mitalic, bold and white on bright green background[22m[23m[49m[39m"`
      )
    })

    test('passing template literals', () => {
      const output = fude.ansi(
        fude.italic`italic and black on bright red background with some ${fude.dim`dim`} and ${fude.inverse`inverse`} text.`,
        fude.bgBrightRedCode,
        fude.blackCode
      )
      showMe(output)

      // `"[101;30m[3mitalic and black on bright red background with some [2mdim[22m and [7minverse[27m text.[0m"`
      expect(output).toMatchInlineSnapshot(
        `"[30m[101m[3mitalic and black on bright red background with some [2mdim[22m and [7minverse[27m text.[23m[49m[39m"`
      )
    })

    test('no colors nsi', () => {
      process.env.FORCE_COLOR = 'off'

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const f = require('../../src')
      const output = f.ansi('not red', 31)

      showMe(output)

      expect(output).toMatchInlineSnapshot(`"not red"`)
    })

    test('passing unknown open/close attribute', () => {
      const output = fude.ansi('close with 0', 300)

      showMe(output)

      expect(output).toMatchInlineSnapshot(`"[300mclose with 0[0m"`)
    })
  })
