
const fs = require('fs').promises
const events = require('events')
const errors = require('@rgrannell/errors')
const constants = require('../commons/constants')
const predefinedPatterns = require('../app/predefined-patterns')
const readStdin = require('../commons/read-stdin')
const printLine = require('../app/print-line')
const handleErrors = require('../commons/handle-errors')

// -- display any uncaught errors.
process.on('uncaughtException', handleErrors)

/**
 * The application function.
 *
 * @param {object} rawArgs CLI arguments
 *
 * @returns {EventEmitter} emits formatted text.
 */
const kale = async rawArgs => {
  const args = await kale.preprocess(rawArgs)

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
kale.preprocess = async rawArgs => {
  const { codes } = constants
  if (!rawArgs) {
    throw errors.badInput('no arguments provided', codes.BAD_INPUT)
  }

  if (!rawArgs.config && rawArgs.name) {
    throw errors.badInput('a pattern name was provided, but no config file containing patterns was specified.', codes.BAD_INPUT)
  }

  if (!rawArgs.config && rawArgs.val) {
    throw errors.badInput('a variable substitution was provided, but no config file containing patterns was specified.', codes.BAD_INPUT)
  }

  try {
    let buffer = await fs.readFile(rawArgs.config)
    var content = buffer.toString()
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw errors.missingConfigFile(`the config file "${rawArgs.config}" could not be found.`, codes.MISSING_CONFIG_FILE)
    }
    throw err
  }

  try {
    var config = JSON.parse(content)
  } catch (err) {
    throw errors.badConfigFile(`failed to parse "${rawArgs.config}" as JSON after reading.`, codes.BAD_CONFIG_FILE)
  }

  const configProperties = Object.keys(config)

  if (!configProperties.includes('regexp') && !configProperties.includes('fixed')) {
    throw errors.badConfigFile(`the object in "${rawArgs.config}" was missing both a "regexp" and "fixed" property; at least one must be specified.`, codes.BAD_CONFIG_FILE)
  }

  if (config.regexp) {
    if (typeof config.regexp !== 'object' || config.regexp === null) {
      throw errors.badConfigFile(`property "regexp" was not a object`, codes.BAD_CONFIG_FILE)
    }

    for (const regexpName of Object.keys(config.regexp)) {
      const val = config.regexp[regexpName]

      if (typeof val !== 'string') {
        throw errors.badConfigFile(`property "regexp.${regexpName}" was not a string; actual type was ${typeof val}.`, codes.BAD_CONFIG_FILE)
      }

      try {
        new RegExp(val)
      } catch (err) {
        throw errors.badRegExp(`regular expression "${val}" did not compile`, codes.BAD_REGEXP)
      }
    }
  }

  if (config.fixed) {
    for (const fixedName of Object.keys(config.fixed)) {
      const val = config.fixed[fixedName]

      if (typeof val !== 'string') {
        throw errors.badConfigFile(`property "fixedName.${fixedName}" was not a string; actual type was ${typeof val}.`, codes.BAD_CONFIG_FILE)
      }
    }

  }

  return rawArgs
}

module.exports = kale
