# 45

> A functionally-oriented test runner

`45` is a test runner that is easy to use and gets out of your way, built on
top of the assertions library [`4.5`](https://github.com/TylorS/4.5).
Supports tests written ES2015 and TypeScript out-of-the-box.

## Let me have it!
```sh
npm install --save-dev 45
```

## Features

- Does not rely on globals
- Test failure if no assertions are returned
- Lazy and monadic test assertions via [`4.5`](https://github.com/TylorS/4.5)

## Basic Usage

Create a test file

```js
// test/foo.js
import { describe, given, it, equals } from '45';

export const test = describe('Array', [
  given('a few numbers', [
    it('length is greater than 0', () => {
      return equals([1, 2, 3].length > 0, true);
    })
  ])
])
```

In your terminal run

```sh
./node_modules/.bin/45 test/foo.js

Describe Array
  given a few numbers
    ✔ it length is greater than 0


# Supports globs
./node_modules/.bin/45 test/*.js
```
