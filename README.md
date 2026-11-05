<picture>
  <source media="(prefers-color-scheme: dark)" srcset="media/fude-logo-dark.png">
  <img src="media/fude-logo.png" alt="Fude — brush lettering beside a vermilion 筆 seal" width="420">
</picture>

A small Node.js library for colouring and styling terminal text. No runtime dependencies; TypeScript declarations included.

[![npm version](https://badgen.net/npm/v/fude)](https://www.npmjs.com/package/fude)
[![CI status](https://github.com/msanguineti/fude/actions/workflows/node.js.yml/badge.svg)](https://github.com/msanguineti/fude/actions/workflows/node.js.yml)

Supports maintained Node.js LTS lines: **22, 24 and 26**.

## Install and use

```sh
npm install fude
```

ES modules and TypeScript:

```js
import { bgRed, white, bgWhite, black } from 'fude'

console.log(bgRed(white('筆')) + bgWhite(black(' fude ')))
```

CommonJS:

```js
const { bgRed, white, bgWhite, black } = require('fude')

console.log(bgRed(white('筆')) + bgWhite(black(' fude ')))
```

Formatting functions accept a string or number and return a string. Nest calls to combine styles:

```js
import { bold, red } from 'fude'

console.log(bold(red('Something went wrong')))
```

Fude detects colour support from `stdout` when the module is loaded. When a style is unavailable, its function returns plain text. Choose an explicit level or a different stream with `Fude` below.

## Colours and styles

| Category | Functions |
| --- | --- |
| Foreground | `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white` |
| Bright foreground | `blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright` |
| Background | `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite` |
| Bright background | `bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright` |
| Modifiers | `bold`, `dim`, `italic`, `underline`, `blink`, `inverse`, `hidden`, `strikethrough`, `reset` |
| Extended colours | `ansi256`, `bgAnsi256`, `rgb`, `bgRgb`, `hex`, `bgHex` |

`gray` and `grey` are aliases for `blackBright`; `bgGray` and `bgGrey` are aliases for `bgBlackBright`. The terminal determines how supported styles appear.

Extended colour functions take a colour first, then the text:

```js
import { ansi256, rgb, bgHex } from 'fude'

console.log(ansi256(9)('red'))
console.log(rgb(255, 99, 71)('tomato text'))
console.log(bgHex('#FFBF47')('mustard background'))
```

Use ANSI colour indices and RGB channel values from `0` to `255`. Hex colours accept three or six digits, with or without `#`.

## Colour support

| Level | Basic colours and modifiers | ANSI 256 colours | RGB and hex |
| --- | --- | --- | --- |
| `0` | Plain text | Plain text | Plain text |
| `1` | Enabled | Plain text | Plain text |
| `2` | Enabled | Enabled | Plain text |
| `3` | Enabled | Enabled | Enabled |

Extended colours return plain text below their required level; they are not converted to a smaller palette. `colorSupportLevel` exports the level chosen for the default functions.

### Explicit levels and streams

`Fude({ level })` creates a set of formatting functions without changing the default exports:

```js
import { Fude } from 'fude'

const plain = Fude({ level: 0 })
const truecolor = Fude({ level: 3 })
const errors = Fude({ level: 'stderr' })

console.log(plain.red('Plain text, even in a colour terminal'))
console.log(truecolor.rgb(255, 99, 71)('Explicit truecolour output'))
console.error(errors.red('Uses stderr colour detection'))
```

Numeric levels are explicit overrides. The stream choices, `'stdout'` and `'stderr'`, detect the selected stream when the instance is created.

### Environment variables and arguments

The default exports choose a level in this order:

1. A valid `FORCE_COLOR` value: `0`, `1`, `2` or `3`.
2. A numbered argument: `--color=0`, `--color=1`, `--color=2` or `--color=3`.
3. Colour disabled by `NO_COLOR`, `NODE_DISABLE_COLORS` or `--no-color`.
4. Automatic detection from `stdout`.

The presence of either disabling variable, including an empty value, disables colour unless a valid override takes precedence. Unrecognised `FORCE_COLOR` values are ignored; the remaining settings still apply. Bare `--color` leaves automatic detection in place rather than forcing colour.

```sh
FORCE_COLOR=3 node example.js
NO_COLOR=1 node example.js
node example.js --color=2
node example.js --no-color
```

Set environment variables and arguments before importing Fude; the default functions are configured at module load.

## Nested styles and resets

Fude restores an outer colour after a nested colour span. Nested `bold` and `dim` spans restore the outer modifier too:

```js
import { bold, dim, red, green } from 'fude'

console.log(red('red ' + green('green') + ' red again'))
console.log(dim('dim ' + bold('bold') + ' dim again'))
```

To restore an outer style after a nested `reset(...)` call, enable reset handling before importing Fude:

```sh
HANDLE_RESET=1 node example.js
# or
node example.js --handle-reset
```

```js
import { red, reset } from 'fude'

console.log(red('red ' + reset('plain') + ' red again'))
```

Without that option, text after the nested reset stays reset until another style opens. Reset handling adds an extra scan; it is off by default. The option restores styles after Fude's own reset closing sequence (`ESC[m`).

## Tagged templates

Install the optional helper separately:

```sh
npm install colorize-template
```

```js
import * as fude from 'fude'
import { createColorize } from 'colorize-template'

const colorize = createColorize(fude)
console.log(colorize`{bgRed {white 筆}}{bgWhite ${fude.rgb(0, 0, 0)(' fude ')}}`)
```

For JavaScript interpolation, pass a template literal to an ordinary formatting call:

```js
import { red } from 'fude'

const name = 'world'
console.log(red(`Hello ${name}`))
```

The helper provides the structured tagged-template syntax above.

## Development and releases

See [Contributing.md](Contributing.md) for development commands, test scope, CI and publishing. Changes to supported Node.js lines are recorded in the [release notes](https://github.com/msanguineti/fude/releases).

## Name and credits

*Fude* (筆, pronounced foo-de, with *de* as in *dentist*) is Japanese for a calligraphy brush.

Thanks to the authors and contributors of [colorette](https://github.com/jorgebucaran/colorette), [picocolors](https://github.com/alexeyraspopov/picocolors) and [Chalk](https://github.com/chalk/chalk). Fude's implementation drew particularly on colorette and picocolors.

By [Mirco Sanguineti](https://github.com/msanguineti) and [contributors](https://github.com/msanguineti/fude/graphs/contributors). [MIT licence](LICENCE).
