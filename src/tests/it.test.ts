import { Test, describe, given, it } from '../';

export const test = describe(`it`, [
  given(`a test name and test function`, [
    it(`returns a Test`, ({ equals, all, assert }) => {
      const testTest: Test = it('does things', () => equals(1, 1));

      return testTest.run().then(assertion => {
        return all([
          assert(testTest.name.includes('does things')),
          assert(assertion.passed),
        ]);
      });
    }),
  ]),

  given(`a test function that does not return an assertion`, [
    it(`returns a failed test`, ({ equals }) => {
      const testTest: Test = it('does stuff', () => { return 1 as any; });

      return testTest.run().then(assertion => {
        if (assertion.passed)
          throw new Error(`Should not return passing assertion`);

        return equals(assertion.message, 'No assertions used');
      });
    }),
  ]),
]);
