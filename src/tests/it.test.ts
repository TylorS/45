import { Test, Verification, describe, equals, given, it } from '../';

export const test = describe(`it`, [
  given(`a test name and test function`, [
    it(`returns a Test`, () => {
      const testTest: Test = it('does things', () => equals(1, 1));

      return testTest.run();
    }),
  ]),

  given(`a test function that does not return an assertion`, [
    it(`returns a failed test`, () => {
      const testTest: Test = it('does stuff', () => { return 1 as any; });

      return testTest.run().then(assertion => {
        return {
          verify(verification: Verification<any>) {
            assertion.verify({
              success() {
                verification.failure('Should not return passing test');
              },
              failure(message: string) {
                if (message.includes('No assertions were returned'))
                  verification.success(void 0);
                else
                  verification.failure('Did not have expected message: ' + message);
              },
            });
          },
        };
      });
    }),
  ]),
]);
