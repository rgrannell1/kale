
# kale [![Build Status](https://travis-ci.org/rgrannell1/kale.png?branch=master)](https://travis-ci.org/rgrannell1/kale)

Kale (colour-tail → cail → kale) behaves similarily to `tail's` live-follow mode, but with extra support for highlighting streamed text.

### Usage

```
kale
```

### Changelog

#### v0.4.0

#### v0.3.0

- Reported nodejs/node #8095, and updated to v7.10.0 which fixed a bug in which Kale only worked for a limited number of lines before halting.

#### v0.2.0

- Corrected error in which documentation incorrectly displayed project author.

- Added inverted-colour mode — --invert — which highlights match backgrounds rather than characters. This is useful when matches are rare.

- Added options to highlight whole-line, — --whole-line — rather than individual matches, which is useful for spotting key-lines in a log-file.

- uncaught errors are now presented tidily to the user.

### License

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
