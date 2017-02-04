import { Test, describe, given, it } from '../';

import { fail } from './fail';

export const test: Test = describe(`fail`, [
  given(`a message string`, [
    it(`returns a FailedAssertion`, ({ all, assert, equals }) => {
      const assertion = fail(`Message`);

      return all([
        assert(!assertion.passed),
        equals(assertion.message, 'Message'),
      ]);
    }),
  ]),
]);
