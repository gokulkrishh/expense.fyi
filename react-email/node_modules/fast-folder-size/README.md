# fast-folder-size

[![ci](https://github.com/simoneb/fast-folder-size/actions/workflows/ci.yml/badge.svg)](https://github.com/simoneb/fast-folder-size/actions/workflows/ci.yml)

Node CLI or module to calculate folder size.

It uses:

- [Sysinternals DU](https://docs.microsoft.com/en-us/sysinternals/downloads/du) on Windows, automatically downloaded at installation time because the license does not allow redistribution
- native `du` on other platforms

## Installation

```
npm i fast-folder-size
```

## Usage

### Programmatically

```js
const { promisify } = require('util')
const fastFolderSize = require('fast-folder-size')
const fastFolderSizeSync = require('fast-folder-size/sync')

// callback
fastFolderSize('.', (err, bytes) => {
  if (err) {
    throw err
  }

  console.log(bytes)
})

// promise
const fastFolderSizeAsync = promisify(fastFolderSize)
const bytes = await fastFolderSizeAsync('.')

console.log(bytes)

// sync
const bytes = fastFolderSizeSync('.')

console.log(bytes)
```

### Command line

```bash
fast-folder-size .
```
