# 45

> A functionally-oriented test runner

`45` is a test runner that is easy to use and gets out of your way.
Supports tests written ES2015 and TypeScript out-of-the-box.

## Let me have it!
```sh
npm install --save-dev 45
```

## Basic Usage

Create a test file

```js
// test/foo.js
import { describe, given, it } from '45';

export const test = describe('Array', [
  given('a few numbers', [
    it('length is greater than 0', ({ assert }) => {
      return assert([1, 2, 3].length > 0);
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
