import { Assertions } from './types';
import * as _assert from '@briancavalier/assert';

export function createAssertions(assertions: { count: number }): Assertions {
  const increment = () => ++assertions.count;

  function eq<A>(expected: A, actual: A): A;
  function eq<A>(expected: A): (actual: A) => A;
  function eq<A>(expected: A, actual?: A) {
    if (!actual) {
      return function eqCurried(_actual: A) {
        increment();
        return _assert.eq(expected, _actual);
      };
    }

    increment();
    return _assert.eq(expected, actual);
  }

  function is<A>(expected: A, actual: A): A;
  function is<A>(expected: A): (actual: A) => A;
  function is<A>(expected: A, actual?: A) {
    if (!actual) {
      return function eqCurried(_actual: A) {
        increment();
        return _assert.is(expected, _actual);
      };
    }

    increment();
    return _assert.is(expected, actual);
  }

  function throws<E extends Error>(f: () => any): E {
    increment();
    return _assert.throws<E>(f);
  }

  function fail<A>(message: A): void {
    increment();
    _assert.fail<A>(message);
  }

  return { eq, is, assert: eq(true), throws, fail };
}
