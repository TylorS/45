import { Test, TestFn } from '../';

import { assertIsAssertion } from './helpers/assertIsAssertion';
import { coerceToPromise } from './helpers/coerceToPromise';

export function it(does: string, test: TestFn): Test {
  return {
    name: does,
    run: () => coerceToPromise(test()).then(assertIsAssertion),
  };
}
