import { ansi_codes } from './suites/ansi_codes'
import { core } from './suites/core'
import { environment } from './suites/environment'
import { ornaments } from './suites/ornaments'
import { readmeExamples } from './suites/readme_examples'
import { rgb_hex } from './suites/rgb_hex'
import { templateLiterals } from './suites/template_literals'

import { bgRed, bgWhite, black, white } from '../src'

beforeEach(() => {
  jest.resetModules()
  delete process.env.FORCE_COLOR
})

describe(bgRed(white('筆')) + bgWhite(black(' fude ')), () => {
  core()
  ornaments()
  ansi_codes()
  templateLiterals()
  rgb_hex()
  environment()
  readmeExamples()
})
