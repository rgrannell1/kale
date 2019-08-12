
'use strict'

const millisecondsPerSecond = 1000

const constants = {
  packageJson: require('../../package'),
  units: {
    millisecondsPerSecond
  },
  regexp: {

    syntaxDelimiters: new RegExp([

      // brackets
      '\\[',
      '\\]',

      '\\(',
      '\\)',

      '\\{',
      '\\}',

      // delimiters
      '\\:',
      '\\,',

      // string open-closing.
      '\\"',
      "\\'"

    ].join('|'), 'g'),

    numbers: new RegExp([

      // TODO port to using a regular expression.
      '[0-9]+'

    ].join('|'), 'g'),

    dates: new RegExp([

      // UNIX timestamps.
      '[0-9]{10}',
      '[0-9]{13}'

    ].join('|'), 'g'),

    hourMinutesSeconds: '[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}'

  }
}

module.exports = constants
