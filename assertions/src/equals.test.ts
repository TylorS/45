import * as assert from 'assert';

import { Assertion, equals } from './';

describe(`equals`, () => {
  describe(`given expected value and actual value`, () => {
    it(`returns an Assertion`, () => {
      const assertion: Assertion = equals(1)(1);

      assert.strictEqual(typeof assertion.passed, 'boolean');
    });

    describe(`if expected value and actual are equal`, () => {
      it(`returns a SuccessfulAssertion`, () => {
        assert.ok(equals('', '').passed);
        assert.ok(equals(1, 1).passed);
        assert.ok(equals({}, {}).passed);
        assert.ok(equals({ a: 1 }, { a: 1 }).passed);
        assert.ok(equals(NaN, NaN).passed);
        assert.ok(equals(0)(-0).passed);
      });
    });

    describe(`if expected value and actual are not equal`, () => {
      it(`returns a FailedAssertion`, () => {
        assert.ok(!equals('', 'asdf').passed);
        assert.ok(!equals(1, 2).passed);
        assert.ok(!equals({ a: 1 }, { a: 2 }).passed);

        const assertion: Assertion = equals({ b: 7 }, { b: 42 });

        if (assertion.passed)
          throw new Error(`Assertion should not succeed`);

        assert.strictEqual(assertion.message, `Equality check failed: { b: 7 }, { b: 42 }`);
      });
    });
  });
});
