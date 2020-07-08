#!/usr/bin/env node

const neodoc = require('neodoc')

const handleErrors = require('../commons/handle-errors')

const constants = require('../commons/constants')

const docs = `
Name:
  kale — highlight logs.
Usage:
  kale [-c <fpath> | --config <fpath>] [(-n <name> | --name <name>)...] [(-x <val> | --val <val>)...] [-e | --regexp] [-f | --fixed-string] [-i | --invert] [-w | --whole-line] <pattern>...
  kale [-c <fpath> | --config <fpath>] [(-n <name> | --name <name>)...] [(-x <val> | --val <val>)...] [-i | --invert] [-w | --whole-line]
  kale [-i | --invert] [-w | --whole-line]
  kale (-h | --help | --version)

Description:
  Kale is a command-line tool that highlights logs.

Options:
  -c <fpath>, --config <fpath>        Load named regular-expressions and fixed-strings from a pattern file. See below for more details.
  -e, --regexp                        Treat provided patterns as non-capture group regular expressions.
  -f, --fixed-string                  Treat provided patterns as literal strings.
  -i, --invert                        Colour-invert any matches.
  -n <name>, --name <name>            The name of a saved pattern. Can be repeated.
  -x <val>, --val <val>               Values for each variable in a saved pattern.
  -w, --whole-line                    If a match occurs, display the whole line comtaining the match rather than the matching text.
  -h, --help                          Display this documentation.
  --version                           Display the package version.

Arguments:
  <pattern>...          The text or regular expression pattern(s) to highlight.

Named Regular Expressions:
  Kale allows regular expressions and fixed strings to be provided directly using -e and -f respectively. To reuse these patterns,
  they can be saved to a .json file. An example file containing two patterns - the regexp "numbers" and fixed string "ourLogger" - is shown below:

  >  }
  >    "regexp": {
  >      "number": "[0-9]+"
  >    },
  >    "fixed": {
  >      "ourLogger": "graylog"
  >    }
  > }

  patterns stored in such a file supports variables, to further aid reuse. For example, adding the pattern:

  > "exitStatus": "#__0__ exited with status __1__"

  and calling:

  > cat mylog.txt | kale -c patterns.json -n exitStatus -x git -x 127
  > cat mylog.txt | kale -c patterns.json -n exitStatus -x java -x 1

  is equivalent to running:

  > cat mylog.txt | kale -f "git exited with status 127"
  > cat mylog.txt | kale -f "java exited with status 1"

  directly.

Examples:
  journalctl | kale
  journalctl | kale -c patterns.json -n ourLogger --whole-line

Authors:
  ${constants.packageJson.author}

Version:
  v${constants.packageJson.version}

Copyright:
  The MIT License

  Copyright (c) 2020 Róisín Grannell

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit
  persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
  OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.

`

const callApp = require('../cli/call-app')

const args = neodoc.run(docs)

callApp(args).catch(handleErrors)
