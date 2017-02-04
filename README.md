# 45

> A functionally-oriented test runner

`45` is a test runner that is easy to use and gets out of your way.
Supports tests written ES2015 and TypeScript out-of-the-box.

## Let me have it!
```sh
npm install --save 45
```

## Basic Usage

Create a test file
```js
// test/foo.js
import { describe, given, it } from '45';

module.exports = describe('foo', [
  given('an iteger', [

    it('returns a string', ({ assert }) => {
      return assert(typeof foo(1) === 'string');
    })
  ])
])
```
In your terminal run
```sh
45 test/foo.js

# Supports globs
45 test/*.js
```