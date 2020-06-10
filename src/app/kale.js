
const fs = require('fs').promises
const events = require('events')
const errors = require('@rgrannell/errors')
const constants = require('../commons/constants')
const predefinedPatterns = require('../app/predefined-patterns')
const readStdin = require('../commons/read-stdin')
const printLine = require('../app/print-line')
const handleErrors = require('../commons/handle-errors')

const { codes } = constants

// -- display any uncaught errors.
process.on('uncaughtException', handleErrors)

const getPatterns = args => {
  if (args.config) {
    const patterns = []

    for (const name of args.name) {
      const regexpHasName = Object.prototype.hasOwnProperty.call(args.config.regexp, name)
      const fixedHasName = Object.prototype.hasOwnProperty.call(args.config.fixed, name)

      if (regexpHasName) {
        patterns.push(args.config.regexp[name])
      } else if (fixedHasName) {
        patterns.push(args.config.fixed[name])
      } else {
        throw errors.badInput(`neither "fixed" and "regexp" have a property named "${name}"`, codes.BAD_INPUT)
      }
    }

    return patterns
  }

  const patternsProvided = args.patterns && args.patterns.length > 0

  // -- use provided patterns or fallback to a default.
  const patterns = patternsProvided
    ? args.patterns
    : predefinedPatterns.default()

  return patterns
}

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

  // -- a function to determine how text is printed.
  const patterns = getPatterns(args)

  readStdin(line => {
    // -- format the text to print
    const formatted = printLine(patterns, line, {
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
 * Parse
 *
 * @param {Object} rawArgs CLI arguments.
 */
const preprocessConfig = async rawArgs => {
  const { codes } = constants

  if (!rawArgs.config && rawArgs.name && rawArgs.name.length > 0) {
    throw errors.badInput('a pattern name was provided, but no config file containing patterns was specified.', codes.BAD_INPUT)
  }

  if (!rawArgs.config && rawArgs.val && rawArgs.name.length > 0) {
    throw errors.badInput('a variable substitution was provided, but no config file containing patterns was specified.', codes.BAD_INPUT)
  }

  if (!rawArgs.config) {
    return
  }

  try {
    const buffer = await fs.readFile(rawArgs.config)
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

      if (regexpName.startsWith('regexp.')) {
        throw errors.badConfigFile(`the regexp name "${regexpName}" cannot start with "regexp."`, codes.BAD_CONFIG_FILE)
      }

      try {
        config.regexp[regexpName] = new RegExp(val, 'g')
      } catch (err) {
        throw errors.badRegExp(`regular expression "${val}" did not compile`, codes.BAD_REGEXP)
      }
    }
  }

  if (config.fixed) {
    for (const fixedName of Object.keys(config.fixed)) {
      const val = config.fixed[fixedName]

      if (fixedName.startsWith('fixed.')) {
        throw errors.badConfigFile(`the fixed-string name "${fixedName}" cannot start with "fixed."`, codes.BAD_CONFIG_FILE)
      }

      if (typeof val !== 'string') {
        throw errors.badConfigFile(`property "fixedName.${fixedName}" was not a string; actual type was ${typeof val}.`, codes.BAD_CONFIG_FILE)
      }
    }
  }

  return config
}

const preprocessName = args => {
  if (args.config && !args.name) {
    throw errors.badInput('names must be provided if config is specified.', codes.BAD_INPUT)
  }
  if (!args.name) {
    return
  }

  const cardinality = [...new Set(args.name)].length

  if (cardinality !== args.name.length) {
    throw errors.badInput('repeated name arguments provided', codes.BAD_INPUT)
  }

  if (cardinality === 0) {
    throw errors.badInput('text will be highlighted as no pattern-names were provided', codes.BAD_INPUT)
  }

  const patterns = []

  for (const name of args.name) {
    const regexpHasName = Object.prototype.hasOwnProperty.call(args.config.regexp, name)
    const fixedHasName = Object.prototype.hasOwnProperty.call(args.config.fixed, name)

    if (regexpHasName && fixedHasName) {
      throw errors.badInput(`both "fixed" and "regexp" have properties named "${name}"`, codes.BAD_INPUT)
    }
    if (!regexpHasName && !fixedHasName) {
      throw errors.badInput(`neither "fixed" and "regexp" have a property named "${name}"`, codes.BAD_INPUT)
    }
  }

  return patterns
}

/**
 * Validate the provided arguments.
 *
 * @param {Object} rawArgs a list of CLI arguments.
 *
 * @returns {Object} processed arguments.
 */
kale.preprocess = async rawArgs => {
  const args = { ...rawArgs }

  if (!rawArgs) {
    throw errors.badInput('no arguments provided', codes.BAD_INPUT)
  }
  args.config = await preprocessConfig(rawArgs)

  preprocessName(args)

  return args
}

module.exports = kale
