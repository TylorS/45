import { Assertion, Test, chain, describe, equals, fail, given, it, timeout } from './';

import { fourtyFive } from './45';

export const tes: Test =
  describe(`45`, [
    given(`a test that throws an error`, [
      it(`handles the errors`, () => {
        const failingTest = it(`fails`, () => { throw new Error(`test failure`); });

        return fourtyFive([failingTest])
          .then(result => {
            const didFail = equals(1, result.failures);
            const containsErrorMessage = equals(true, result.message.indexOf(`test failure`) > -1);

            return chain(() => containsErrorMessage, didFail);
          })
      }),
    ]),

    given(`a test that exceeds a timeout`, [
      it(`should fail`, () => {
        const time = 100;

        const promise = new Promise<Assertion<any>>((resolve) => {
          setTimeout(() => {
            resolve(fail(`Test should timeout`))
          }, time * 2);
        });

        const failingTest = timeout(time, it(`should timeout`, () => promise));

        return fourtyFive([failingTest])
          .then(result => {
            const didFail = equals(1, result.failures);
            const containsErrorMessage = equals(true, result.message.indexOf(`Timeout`) > -1)

            return chain(() => containsErrorMessage, didFail);
          });
      }),
    ]),
  ]);
