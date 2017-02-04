import * as assert from '../assertions';

import { Test, TestFn } from '../';
import { blue, bold } from 'typed-colors';

import { assertIsAssertion } from '../helpers/assertIsAssertion';
import { coerceToPromise } from '../helpers/coerceToPromise';

export function it(does: string, test: TestFn): Test {
  return {
    name: bold(blue('it ') + does),
    showStatus: true,
    run: () => coerceToPromise(test(assert)).then(assertIsAssertion),
  };
}
