const isEqual: (a: any, b: any) => boolean = require('lodash.isequal');

import { green, red } from 'typed-colors';

import { Assertion } from '../';
import { curry2 } from '@typed/curry';
import { inspect } from './inspect';

export const equals: EqualsFn = curry2(
  function equals<A>(expected: A, actual: A): Assertion {
    const areEqual = isEqual(expected, actual);

    if (areEqual)
      return {
        passed: true,
        message: ``,
      };

    return {
      passed: false,
      message: `Equality check failed:
    ${green('Expected')}: ${inspect(expected)}
    ${red('Actual')}: ${inspect(actual)}`,
    };
  },
);

export interface EqualsFn {
  <A>(expected: A, actual: A): Assertion;
  <A>(expected: A): (actual: A) => Assertion;
}
