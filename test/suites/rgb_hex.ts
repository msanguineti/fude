import * as fude from '../../src'

import { showMe } from './showMe'

export const rgb_hex = (): void =>
  describe('rgb_hex', () => {
    test('rgb', () => {
      const rgb1 = fude.blue(
        fude.rgb('tomato text', { r: 255, g: 99, b: 71 }) + ' i am blue'
      )

      showMe(rgb1)

      expect(rgb1).toMatchInlineSnapshot(`"[34m[38;2;255;99;71mtomato text[34m i am blue[39m"`)

      const rgb2 = fude.rgbBg('mustard background', { r: 255, g: 191, b: 71 })

      showMe(rgb2)

      expect(rgb2).toMatchInlineSnapshot(`"[48;2;255;191;71mmustard background[49m"`)

      const rgb3 = `${fude.rgb('You have misspelt:', {
        g: 128,
      })} ${fude.rgbUnderline(fude.black(fude.bold('buisness')), {
        r: 255,
        g: 50,
        b: 50,
      })}`

      showMe(rgb3)

      expect(rgb3).toMatchInlineSnapshot(`"[38;2;0;128;0mYou have misspelt:[39m [58;2;255;50;50m[4m[30m[1mbuisness[22m[39m[24m[59m"`)

      const rgb4 = `
      Q: 1 + 1

      A: ${fude.rgbUnderline(3 + '', { r: 255, double: true })} ${fude.bold(
        fude.red('Bad Error!!!')
      )}`

      expect(rgb4).toMatchInlineSnapshot(`
        "
              Q: 1 + 1

              A: [58;2;255;0;0m[21m3[24m[59m [1m[31mBad Error!!![39m[22m"
      `)

      showMe(rgb4)

      const hex1 = fude.blue(fude.hex('tomato text', 'ff6347') + ' i am blue')

      expect(hex1).toMatch(rgb1)

      const hex2 = fude.hexBg('mustard background', '#ffbf47')

      expect(hex2).toMatch(rgb2)

      const hex3 = `${fude.hex(
        'You have misspelt:',
        '008000'
      )} ${fude.hexUnderline(fude.black(fude.bold('buisness')), 'ff3232')}`

      expect(hex3).toMatch(rgb3)

      const hex4 = `
      Q: 1 + 1

      A: ${fude.hexUnderline(3 + '', 'F00', true)} ${fude.bold(
        fude.red('Bad Error!!!')
      )}`

      expect(hex4).toMatch(rgb4)
    })

    test('hex wrong arg', () => {
      const hex1 = fude.blue(
        fude.hex('not tomato text but', 'foobar') + ' i am blue'
      )

      showMe(hex1)

      expect(hex1).toMatchInlineSnapshot(
        `"[34m[38;2;NaN;NaN;NaNmnot tomato text but[34m i am blue[39m"`
      )

      const hex2 = fude.hexBg('not mustard background', '#bar')

      showMe(hex2)

      expect(hex2).toMatchInlineSnapshot(`"[48;2;187;170;NaNmnot mustard background[49m"`)

      const hex3 = `${fude.hex(
        'You have misspelt:',
        '008000'
      )} ${fude.hexUnderline(
        fude.black(fude.bold('buisness')),
        'foo'
      )} and no colored underlined`

      showMe(hex3)

      expect(hex3).toMatchInlineSnapshot(
        `"[38;2;0;128;0mYou have misspelt:[39m [58;2;255;NaN;NaNm[4m[30m[1mbuisness[22m[39m[24m[59m and no colored underlined"`
      )
    })

    test('rgb hex colors off', () => {
      process.env.FORCE_COLOR = 'off'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const f = require('../../src')
      const rgb2 = f.rgbBg('not mustard background', { r: 255, g: 191, b: 71 })

      showMe(rgb2)

      expect(rgb2).toMatchInlineSnapshot(`"not mustard background"`)
    })
  })
