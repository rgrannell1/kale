
const constants = {
  packageJson: require('../../package'),
  regexp: {
    // -- these common delimiter are highlighted by default.
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

    numbers: /[0-9]+/g,

    dates: new RegExp([

      // UNIX timestamps.
      '[0-9]{10}',
      '[0-9]{13}'

    ].join('|'), 'g'),

    hourMinutesSeconds: '[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}'

  },
  // -- colours to display highlighted text.
  displayColours: [
    'green',
    'red',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'black',
    'white',
    'gray',
    'grey'
  ],
  codes: {
    BAD_INPUT: 'KALE_001',
    MISSING_CONFIG_FILE: 'KALE_002',
    BAD_CONFIG_FILE: 'KALE_003',
    BAD_REGEXP: 'KALE_004'
  }
}

module.exports = constants
