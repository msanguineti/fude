import { ansi_codes } from './suites/ansi_codes'
import { core } from './suites/core'
import { misc } from './suites/environment'
import { templateLiterals } from './suites/template_literals'
import { ornaments } from './suites/ornaments'
import { readmeExamples } from './suites/readme_examples'
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
  misc()
  readmeExamples()
})
