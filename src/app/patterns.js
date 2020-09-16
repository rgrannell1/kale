
const { nanoid } = require('nanoid')
const moment = require('moment')
const errors = require('@rgrannell/errors')

const constants = require('../commons/constants')
const { codes } = constants

const patternUtils = { }

const builtInHighlighters = { }

/**
 * Default syntax highlighting patterns.
 *
 * @returns {Array<any>}
 */
builtInHighlighters.default = () => [
  constants.regexp.syntaxDelimiters,
  constants.regexp.numbers
]

/**
 * Highlight the present date.
 *
 * @returns {Array<any>}
 */
builtInHighlighters.today = () => {
  const now = moment()
  const todayPrefixes = [
    now.format('MMM D'),
    now.format('MMM Do'),
    now.format('MMM DD'),
    now.format('MMM  DD'),

    now.format('MMMM D'),
    now.format('MMMM Do'),
    now.format('MMMM DD')
  ]

  return todayPrefixes.reduce((acc, prefix) => {
    return acc.concat([
      prefix + '[ \t]+' + constants.regexp.hourMinutesSeconds
    ])
  }, [])
}

patternUtils.builtInHighlighters = builtInHighlighters

/**
 * Substitute values into patterns provided.
 *
 * @param {string[]} values to substitute into each pattern.
 * @param {string} pattern each regexp or fixed string pattern
 */
patternUtils.substituteValues = (values, pattern) => {
  if (!values) {
    return pattern
  }

  const ids = {

  }
  let idx = 0
  for (let ith = 0; ith < values.length; ++ith) {
    ids[`__${idx}__`] = [nanoid(), values[ith]]
    ++idx
  }

  let idSubstituted = pattern
  for (const [sub, pair] of Object.entries(ids)) {
    const [id] = pair
    idSubstituted = idSubstituted.replace(sub, id)
  }

  for (const pair of Object.values(ids)) {
    const [id, val] = pair
    idSubstituted = idSubstituted.replace(id, val)
  }

  return idSubstituted
}

/**
 * Get patterns from a config file.
 *
 * @param {Object} args CLI arguments
 *
 * @returns {Array<string>} an array of patterns
 */
patternUtils.getPatterns = args => {
  if (args.config) {
    const patterns = []

    for (const name of args.name) {
      const regexpHasName = Object.prototype.hasOwnProperty.call(args.config.regexp || {}, name)
      const fixedHasName = Object.prototype.hasOwnProperty.call(args.config.fixed || {}, name)

      if (regexpHasName) {
        const pattern = args.config.regexp[name]
        const expr = new RegExp(patternUtils.substituteValues(args.val, pattern), 'g')
        patterns.push(expr)
      } else if (fixedHasName) {
        const pattern = args.config.fixed[name]
        patterns.push(patternUtils.substituteValues(args.val, pattern))
      } else {
        throw errors.badInput(`neither "fixed" and "regexp" have a property named "${name}"`, codes.BAD_INPUT)
      }
    }

    return patterns
  }

  const patternsProvided = args.patterns && args.patterns.length > 0 && args.patterns.some(pattern => {
    return pattern.length > 0
  })

  // -- use provided patterns or fallback to a default.
  const patterns = patternsProvided
    ? args.patterns
    : patternUtils.builtInHighlighters.default()

  return patternUtils.substituteValues(args.val, patterns)
}

module.exports = patternUtils
