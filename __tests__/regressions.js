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
        getColorDepth: () => depth,
      })) {
        descriptors.push([
          stream,
          key,
          Object.getOwnPropertyDescriptor(stream, key),
        ])
        Object.defineProperty(stream, key, { configurable: true, value })
      }
    }

    jest.resetModules()
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
    expect(f.red('x\x1b[39m'.repeat(count))).toBe(
      '\x1b[31m' + 'x\x1b[31m'.repeat(count) + '\x1b[39m',
    )
  })

  test('restores the outer colour for many embedded resets', () => {
    const f = loadFude({ env: { HANDLE_RESET: '1' } })
    const count = 20000
    expect(f.red('x\x1b[m'.repeat(count))).toBe(
      '\x1b[31m' + 'x\x1b[m\x1b[31m'.repeat(count) + '\x1b[39m',
    )
  })

  test('restores a colour when a close sequence starts the input', () => {
    const f = loadFude()
    expect(f.red('\x1b[39mtext')).toBe('\x1b[31m\x1b[31mtext\x1b[39m')
  })

  test('restores a background when a close sequence starts the input', () => {
    const f = loadFude()
    expect(f.bgRed('\x1b[49mtext')).toBe('\x1b[41m\x1b[41mtext\x1b[49m')
  })

  test('restores dim after an embedded bold span', () => {
    const f = loadFude()
    expect(f.dim('a' + f.bold('b') + 'c')).toBe(
      '\x1b[22m\x1b[2ma\x1b[22m\x1b[1mb\x1b[22m\x1b[2mc\x1b[2m\x1b[22m',
    )
  })

  test('restores bold after an embedded dim span', () => {
    const f = loadFude()
    expect(f.bold('a' + f.dim('b') + 'c')).toBe(
      '\x1b[22m\x1b[1ma\x1b[22m\x1b[2mb\x1b[22m\x1b[1mc\x1b[2m\x1b[22m',
    )
  })
})

describe('colour detection and exact flags', () => {
  test.each([
    [0, 0],
    [1, 0],
    [4, 1],
    [8, 2],
    [24, 3],
  ])('maps terminal depth %i to support level %i', (depth, level) => {
    expect(loadFude({ stdout: depth }).colorSupportLevel).toBe(level)
  })

  test('detects stdout and stderr independently', () => {
    expect(
      loadFude({
        stdout: 0,
        stderr: 8,
        select: (f) => [
          f.Fude({ level: 'stdout' }).red('text'),
          f.Fude({ level: 'stderr' }).ansi256(9)('text'),
        ],
      }),
    ).toEqual(['text', '\x1b[38;5;9mtext\x1b[39m'])
  })

  test('does not treat unrelated flags as --no-color', () => {
    expect(loadFude({ argv: ['--no-colorful'] }).colorSupportLevel).toBe(3)
  })

  test('still recognises --no-color', () => {
    expect(loadFude({ argv: ['--no-color'] }).red('text')).toBe('text')
  })

  test('does not treat unrelated flags as --handle-reset', () => {
    const f = loadFude({ argv: ['--handle-reset-extra'] })
    expect(f.red('a' + f.reset('b') + 'c')).toBe(
      '\x1b[31ma\x1b[0mb\x1b[mc\x1b[39m',
    )
  })

  test('still recognises --handle-reset', () => {
    const f = loadFude({ argv: ['--handle-reset'] })
    expect(f.red('a' + f.reset('b') + 'c')).toBe(
      '\x1b[31ma\x1b[0mb\x1b[m\x1b[31mc\x1b[39m',
    )
  })
})
