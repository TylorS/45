import * as assert from 'assert';

import { Test, equals, it as it45 } from '../';

describe(`it`, () => {
  describe(`given a test name and test function`, () => {
    it(`returns a Test`, () => {
      const test: Test = it45('does things', () => equals(1, 1));

      assert.strictEqual(test.name, 'does things');

      return test.run().then(assertion => {
        assert.ok(assertion.passed);
      });
    });
  });

  describe(`given a test function that does not return an assertion`, () => {
    it(`returns a failed test`, () => {
      const test: Test = it45('does stuff', () => { return 1 as any; });

      return test.run().then(assertion => {
        if (assertion.passed)
          throw new Error(`Should not return passing assertion`);

        assert.strictEqual(assertion.message, 'No assertions used');
      });
    });
  });
});
