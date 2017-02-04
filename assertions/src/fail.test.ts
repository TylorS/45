import * as assert from 'assert';

import { fail } from './fail';

describe(`fail`, () => {
  describe(`given a message string`, () => {
    it(`returns a FailedAssertion`, () => {
      const assertion = fail(`Message`);

      assert.ok(!assertion.passed);
      assert.strictEqual(assertion.message, `Message`);
    });
  });
});
