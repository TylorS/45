import isEqual = require('lodash.isequal');

import { Assertion } from './';
import { curry2 } from '@typed/curry';
import { inspect } from './inspect';

export const equals: EqualsFn = curry2(
  function equals<A>(expected: A, actual: A): Assertion {
    const areEqual = isEqual(expected, actual);

    if (areEqual)
      return { passed: true };

    return {
      passed: false,
      message: `Equality check failed: ${inspect(expected)}, ${inspect(actual)}`,
    };
  },
);

export interface EqualsFn {
  <A>(expected: A, actual: A): Assertion;
  <A>(expected: A): (actual: A) => Assertion;
}
