
const app = require('../app/kale')

const callApp = rawArgs => app(callApp.preprocess(rawArgs))

callApp.preprocess = rawArgs => {
  return {
    regexp: rawArgs['--regexp'],
    fixedString: rawArgs['--fixed-string'],
    default: rawArgs['--default'],
    invert: rawArgs['--invert'],
    displayWholeLine: rawArgs['--whole-line'],

    display: true,

    patterns: rawArgs['<pattern>'],
    version: rawArgs['--version'],

    config: rawArgs['--config'],
    name: rawArgs['--name'],
    val: rawArgs['--val']
  }
}

module.exports = callApp
