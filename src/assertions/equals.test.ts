import { Assertion, Test, describe, given, it } from '../';

import { strip } from 'typed-colors';

export const test: Test = describe(`equals`, [
  given(`expected value and actual value`, [
    it(`returns an Assertion`, ({ equals }) => {
      const assertion: Assertion = equals(1)(1);

      return equals(typeof assertion.passed, 'boolean');
    }),

    given(`expected value and actual are equal`, [
      it(`returns a SuccessfulAssertion`, ({ all, equals }) => {
        return all([
          equals('', ''),
          equals(1, 1),
          equals({}, {}),
          equals({ a: 1 }, { a: 1 }),
          equals(NaN, NaN),
          equals(0)(-0),
        ]);
      }),
    ]),

    given(`xpected value and actual are not equal`, [
      it(`returns a FailedAssertion`, ({ equals, all, assert }) => {
        const passed = all([
          assert(!equals('', 'asdf').passed),
          assert(!equals(1, 2).passed),
          assert(!equals({ a: 1 }, { a: 2 }).passed),
        ]);

        const assertion: Assertion = equals({ b: 7 }, { b: 42 });

        if (assertion.passed)
          throw new Error(`Assertion should not succeed`);

        return all([
          passed,
          equals(
            `Equality check failed: Expected: { b: 7 } Actual: { b: 42 }`.replace(/\s/g, ''),
            strip(assertion.message).replace(/\s/g, ''),
          ),
        ]);
      }),
    ]),
  ]),
]);
