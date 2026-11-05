const { describe, test } = require('node:test')
const assert = require('node:assert/strict')

const loadFude = ({
  argv = [],
  env = {},
  stdout = 24,
  stderr = 24,
  select = (f) => f,
} = {}) => {
  const originalEnv = process.env
  const originalArgv = process.argv
  const descriptors = []

  try {
    process.env = { ...originalEnv }
    for (const key of [
      'FORCE_COLOR',
      'NO_COLOR',
      'NODE_DISABLE_COLORS',
      'HANDLE_RESET',
    ]) {
      delete process.env[key]
    }
    Object.assign(process.env, env)
    process.argv = [originalArgv[0], originalArgv[1], ...argv]

    for (const [stream, depth] of [
      [process.stdout, stdout],
      [process.stderr, stderr],
    ]) {
      for (const [key, value] of Object.entries({
        isTTY: depth !== 0,
        getColorDepth: depth === null ? undefined : () => depth,
      })) {
        descriptors.push([
          stream,
          key,
          Object.getOwnPropertyDescriptor(stream, key),
        ])
        Object.defineProperty(stream, key, { configurable: true, value })
      }
    }

    delete require.cache[require.resolve('../dist')]
    return select(require('../dist'))
  } finally {
    for (const [stream, key, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(stream, key, descriptor)
      else delete stream[key]
    }
    process.env = originalEnv
    process.argv = originalArgv
  }
}

describe('ANSI replacement regressions', () => {
  test('restores the outer colour for many embedded close sequences', () => {
    const f = loadFude()
    const count = 20000
    assert.strictEqual(
      f.red('x\x1b[39m'.repeat(count)),
      '\x1b[31m' + 'x\x1b[31m'.repeat(count) + '\x1b[39m',
    )
  })

  test('restores the outer colour for many embedded resets', () => {
    const f = loadFude({ env: { HANDLE_RESET: '1' } })
    const count = 20000
    assert.strictEqual(
      f.red('x\x1b[m'.repeat(count)),
      '\x1b[31m' + 'x\x1b[m\x1b[31m'.repeat(count) + '\x1b[39m',
    )
  })

  test('restores a colour when a close sequence starts the input', () => {
    const f = loadFude()
    assert.strictEqual(f.red('\x1b[39mtext'), '\x1b[31m\x1b[31mtext\x1b[39m')
  })

  test('restores a background when a close sequence starts the input', () => {
    const f = loadFude()
    assert.strictEqual(f.bgRed('\x1b[49mtext'), '\x1b[41m\x1b[41mtext\x1b[49m')
  })

  test('restores dim after an embedded bold span', () => {
    const f = loadFude()
    assert.strictEqual(
      f.dim('a' + f.bold('b') + 'c'),
      '\x1b[22m\x1b[2ma\x1b[22m\x1b[1mb\x1b[22m\x1b[2mc\x1b[2m\x1b[22m',
    )
  })

  test('restores bold after an embedded dim span', () => {
    const f = loadFude()
    assert.strictEqual(
      f.bold('a' + f.dim('b') + 'c'),
      '\x1b[22m\x1b[1ma\x1b[22m\x1b[2mb\x1b[22m\x1b[1mc\x1b[2m\x1b[22m',
    )
  })
})

describe('colour detection and exact flags', () => {
  test('a TTY without getColorDepth safely disables colour', () => {
    assert.strictEqual(loadFude({ stdout: null }).colorSupportLevel, 0)
  })
  for (const [depth, level] of [
    [0, 0],
    [1, 0],
    [4, 1],
    [8, 2],
    [24, 3],
  ]) {
    test(`maps terminal depth ${depth} to support level ${level}`, () => {
      assert.strictEqual(loadFude({ stdout: depth }).colorSupportLevel, level)
    })
  }

  test('detects stdout and stderr independently', () => {
    assert.deepStrictEqual(
      loadFude({
        stdout: 0,
        stderr: 8,
        select: (f) => [
          f.Fude({ level: 'stdout' }).red('text'),
          f.Fude({ level: 'stderr' }).ansi256(9)('text'),
        ],
      }),
      ['text', '\x1b[38;5;9mtext\x1b[39m'],
    )
  })

  test('does not treat unrelated flags as --no-color', () => {
    assert.strictEqual(
      loadFude({ argv: ['--no-colorful'] }).colorSupportLevel,
      3,
    )
  })

  test('still recognises --no-color', () => {
    assert.strictEqual(loadFude({ argv: ['--no-color'] }).red('text'), 'text')
  })

  test('does not treat unrelated flags as --handle-reset', () => {
    const f = loadFude({ argv: ['--handle-reset-extra'] })
    assert.strictEqual(
      f.red('a' + f.reset('b') + 'c'),
      '\x1b[31ma\x1b[0mb\x1b[mc\x1b[39m',
    )
  })

  test('still recognises --handle-reset', () => {
    const f = loadFude({ argv: ['--handle-reset'] })
    assert.strictEqual(
      f.red('a' + f.reset('b') + 'c'),
      '\x1b[31ma\x1b[0mb\x1b[m\x1b[31mc\x1b[39m',
    )
  })
})

describe('public formatting contracts', () => {
  test('foreground and background colours use their ANSI codes, including aliases', () => {
    const f = loadFude()
    const names = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White']
    for (const [index, name] of names.entries()) {
      const foreground = name[0].toLowerCase() + name.slice(1)
      assert.strictEqual(f[foreground]('x'), `\x1b[${30 + index}mx\x1b[39m`)
      assert.strictEqual(f[foreground + 'Bright']('x'), `\x1b[${90 + index}mx\x1b[39m`)
      assert.strictEqual(f['bg' + name]('x'), `\x1b[${40 + index}mx\x1b[49m`)
      assert.strictEqual(f['bg' + name + 'Bright']('x'), `\x1b[${100 + index}mx\x1b[49m`)
    }
    for (const alias of ['gray', 'grey']) assert.strictEqual(f[alias]('x'), f.blackBright('x'))
    for (const alias of ['bgGray', 'bgGrey']) assert.strictEqual(f[alias]('x'), f.bgBlackBright('x'))
  })

  test('modifiers emit their own opening and closing codes', () => {
    const f = loadFude()
    for (const [name, open, close] of [
      ['italic', 3, 23], ['underline', 4, 24], ['blink', 5, 25],
      ['inverse', 7, 27], ['hidden', 8, 28], ['strikethrough', 9, 29],
    ]) assert.strictEqual(f[name]('x'), `\x1b[${open}mx\x1b[${close}m`)
  })

  test('custom levels enable exactly the promised colour capabilities', () => {
    const f = loadFude()
    for (const level of [0, 1, 2, 3]) {
      const c = f.Fude({ level })
      assert.strictEqual(c.red('x'), level >= 1 ? '\x1b[31mx\x1b[39m' : 'x')
      assert.strictEqual(c.bold('x'), level >= 1 ? '\x1b[22m\x1b[1mx\x1b[2m\x1b[22m' : 'x')
      assert.strictEqual(c.ansi256(9)('x'), level >= 2 ? '\x1b[38;5;9mx\x1b[39m' : 'x')
      assert.strictEqual(c.bgAnsi256(9)('x'), level >= 2 ? '\x1b[48;5;9mx\x1b[49m' : 'x')
      assert.strictEqual(c.rgb(1, 2, 3)('x'), level === 3 ? '\x1b[38;2;1;2;3mx\x1b[39m' : 'x')
      assert.strictEqual(c.bgRgb(1, 2, 3)('x'), level === 3 ? '\x1b[48;2;1;2;3mx\x1b[49m' : 'x')
      assert.strictEqual(c.hex('#123')('x'), level === 3 ? '\x1b[38;2;17;34;51mx\x1b[39m' : 'x')
      assert.strictEqual(c.bgHex('#123')('x'), level === 3 ? '\x1b[48;2;17;34;51mx\x1b[49m' : 'x')
    }
  })

  test('a different nested foreground restores the outer colour', () => {
    const f = loadFude()
    assert.strictEqual(f.red('a' + f.green('b') + 'c'), '\x1b[31ma\x1b[32mb\x1b[31mc\x1b[39m')
    assert.strictEqual(f.bgRed('a' + f.bgGreen('b') + 'c'), '\x1b[41ma\x1b[42mb\x1b[41mc\x1b[49m')
  })

  test('explicit overrides win over disabling variables, and zero still disables', () => {
    for (const variable of ['NO_COLOR', 'NODE_DISABLE_COLORS']) {
      assert.strictEqual(loadFude({ env: { [variable]: '', FORCE_COLOR: '2' } }).colorSupportLevel, 2)
      assert.strictEqual(loadFude({ env: { [variable]: '' }, argv: ['--color=3'] }).colorSupportLevel, 3)
    }
    assert.strictEqual(loadFude({ env: { FORCE_COLOR: '0' }, argv: ['--color=3'] }).red('x'), 'x')
    assert.strictEqual(loadFude({ argv: ['--no-color', '--color=2'] }).colorSupportLevel, 2)
  })
})
