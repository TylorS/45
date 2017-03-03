# 45

> A functionally-oriented test runner

`45` is the fast and functional test runner that is easy to use and gets out of
your way.

## Let me have it!
```sh
npm install --save-dev 45
```

## Features

- Does not rely on globals
- Test failure if no assertions are returned
- Lazy, monadic, and curried test assertions via [`4.5`](https://github.com/TylorS/4.5)
- Promise, Observable, and Async/Await support
- Runs all tests in parallel
- ES2015 and TypeScript support out-of-box

## Basic Usage

Create a test file

```js
// test/foo.js

# ES2015
import { describe, given, it, equals } from '45';

export const test = describe('Array', [
  given('a few numbers', [
    it('has length greater than 0', () => {
      return equals([1, 2, 3].length > 0, true);
    })
  ])
])

export const otherTest = it('equals 4', () => {
  return equals(4, 4);
})

# commonjs
const { describe, given, it, equals } = require('45');

exports.test = describe('Array', [
  given('a few numbers', [
    it('has length greater than 0', () => {
      return equals([1, 2, 3].length > 0, true);
    })
  ])
])

exports.otherTest = it('equals 4', () => {
  return equals(4, 4);
})
```

In your terminal run

```sh
./node_modules/.bin/45 test/foo.js
# Supports globs
./node_modules/.bin/45 test/*.js

# or without parameters
# by default it will search for all .test and .spec files in src/ folder
# and for all files in test/ and tests/ folders
./node_modules/.bin/45
```

And you should see:

![basic-test](./.assets/basic_test.png)