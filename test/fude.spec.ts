import { codes } from './suites/ansi_codes'
import { core } from './suites/core'
import { misc } from './suites/misc'
import { templateLiterals } from './suites/template_literals'
import { ornaments } from './suites/ornaments'
import { readmeExamples } from './suites/readme_examples'
import { bgRed, bgWhite, black, white } from '../src'

beforeEach(() => {
  //ensure outputting codes in case test is done in a non-TTY env... think CI/CD
  process.env.FORCE_COLORS = 'on'
})

describe(bgRed(white('筆')) + bgWhite(black(' fude ')), () => {
  core()
  ornaments()
  codes()
  templateLiterals()
  misc()
  readmeExamples()
})
