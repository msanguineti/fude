const assert = require('node:assert/strict')
const { execFileSync } = require('node:child_process')
const { mkdtempSync, writeFileSync, appendFileSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const path = require('node:path')
const root = path.resolve(__dirname, '..')
const workspace = mkdtempSync(path.join(tmpdir(), 'fude-package-'))
const npm = (args, cwd = root) => execFileSync(process.execPath,
  [process.env.npm_execpath, ...args], { cwd, encoding: 'utf8' })

try {
  // test:package already verified this build. Do not rebuild while packing it.
  const [packed] = JSON.parse(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', workspace]))
  const tarball = path.join(workspace, packed.filename)
  assert.deepEqual(packed.files.map(file => file.path).sort(),
    ['LICENCE', 'README.md', 'dist/index.d.ts', 'dist/index.js', 'package.json'])
  writeFileSync(path.join(workspace, 'package.json'), '{"private":true}')
  npm(['install', '--ignore-scripts', '--no-audit', '--no-fund', tarball], workspace)
  execFileSync(process.execPath, ['-e', `
    const assert = require('node:assert/strict'); const f = require('fude');
    const c = f.Fude({level:3});
    assert.equal(c.bgHex('#FFBF47')('x'), '\\x1b[48;2;255;191;71mx\\x1b[49m');
    assert.equal(c.red('x\\x1b[39m'.repeat(20000)), '\\x1b[31m'+'x\\x1b[31m'.repeat(20000)+'\\x1b[39m');
  `], { cwd: workspace, stdio: 'inherit' })
  execFileSync(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict'; import fude, {Fude, bgHex} from 'fude';
    assert.equal(Fude, fude.Fude); assert.equal(bgHex, fude.bgHex);
    assert.equal(Fude({level:0}).red('x'), 'x');
  `], { cwd: workspace, stdio: 'inherit' })
  writeFileSync(path.join(workspace, 'usage.ts'), `
    import { bgRed, white, bgWhite, black, bgHex, Fude } from 'fude'
    const logo: string = bgRed(white('筆')) + bgWhite(black(' fude '))
    const background: string = bgHex('#FFBF47')('mustard background')
    const plain: string = Fude({level:0}).red('text')
    void [logo, background, plain]
  `)
  execFileSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'),
    '--noEmit', '--strict', '--target', 'ES2022', '--module', 'Node16',
    '--moduleResolution', 'Node16', path.join(workspace, 'usage.ts')], { cwd: workspace, stdio: 'inherit' })
  console.log(`Verified packed CommonJS, ESM, TypeScript and ANSI behaviour: ${tarball}`)
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `tarball=${tarball}\n`)
  if (process.env.FUDE_KEEP_PACKAGE !== '1') rmSync(workspace, { recursive: true, force: true })
} catch (error) {
  rmSync(workspace, { recursive: true, force: true })
  throw error
}
