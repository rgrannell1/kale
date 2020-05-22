
const moment = require('moment')

const constants = require('../commons/constants')

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

module.exports = builtInHighlighters
