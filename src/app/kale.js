
const userFailingErrorMesasage = `Something has went terribly wrong!
Please report the following error message to https://github.com/rgrannell1/kale/issues,
(along with the input text if possible):
`

const events = require('events')
const constants = require('../commons/constants')
const predefinedPatterns = require('../app/predefined-patterns')
const readStdin = require('../commons/read-stdin')
const printLine = require('../app/print-line')

// -- display any uncaught errors.
process.on('uncaughtException', err => {
  console.error(userFailingErrorMesasage)

  console.error(err.message)
  console.error(err.stack)

  process.exit(1)
})

/**
 * The application function.
 *
 * @param {object} rawArgs CLI arguments
 *
 * @returns {EventEmitter} emits formatted text.
 */
const kale = rawArgs => {
  const args = kale.preprocess(rawArgs)

  // -- display the version.
  if (args.version) {
    console.log(constants.packageJson.version)
    process.exit(0)
  }

  const outEmitter = new events.EventEmitter()

  const mode = args.fixedString
    ? 'literalString'
    : 'regexp'

  // -- a function to determine how text is printed.
  const printer = printLine[mode]

  const patternsProvided = rawArgs.patterns && rawArgs.patterns.length > 0

  // -- use provided patterns or fallback to a default.
  const patterns = patternsProvided
    ? rawArgs.patterns
    : predefinedPatterns.default()

  readStdin(line => {
    // -- format the text to print
    const formatted = printer(patterns, line, {
      invert: args.invert,
      displayWholeLine: args.displayWholeLine
    })

    // print the text
    if (rawArgs.display) {
      console.log(formatted)
    }

    // emit the line
    outEmitter.emit('line', {
      before: line,
      after: formatted
    })
  })

  return outEmitter
}

/**
 * Validate the provided arguments.
 *
 * @param {Object} rawArgs a list of CLI arguments.
 *
 * @returns {Object} processed arguments.
 */
kale.preprocess = rawArgs => {
  return rawArgs
}

module.exports = kale
