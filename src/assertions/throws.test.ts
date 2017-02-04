import * as assert from 'assert';

import { throws } from './throws';

describe(`throws`, () => {
  describe(`given a function that throws`, () => {
    it(`Returns an SuccefulAssertion`, () => {
      const assertion = throws(() => { throw new Error(`Wtf`); });

      assert.ok(assertion.passed);
    });
  });

  describe(`given a function that does not throw`, () => {
    it(`Returns a FailedAssertion`, () => {
      const assertion = throws(() => 1);

      assert.ok(!assertion.passed);
    });
  });
});
