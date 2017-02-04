import { Test, describe, given, it } from '../';

import { throws } from './throws';

export const test: Test = describe(`throws`, [
  given(`a function that throws`, [
    it(`Returns an SuccefulAssertion`, ({ assert }) => {
      const assertion = throws(() => { throw new Error(`Wtf`); });

      return assert(assertion.passed);
    }),
  ]),

  given(`a function that does not throw`, [
    it(`Returns a FailedAssertion`, ({ assert }) => {
      const assertion = throws(() => 1);

      return assert(!assertion.passed);
    }),
  ]),
]);
