import { Test, chain, describe, equals, given, it } from './';

import { fourtyFive } from './45';

export const tes: Test =
  describe(`45`, [
    given(`A test that throws an error`, [
      it(`Handles the errors`, () => {
        const failingTest = it(`fails`, () => { throw new Error(`test failure`); });

        return fourtyFive([ failingTest ])
          .then(result => {
            const didFail = equals(1, result.failures);
            const containsErrorMessage = equals(true, result.message.indexOf(`test failure`) > -1);

            return chain(() => containsErrorMessage, didFail);
          })
      }),
    ]),
  ]);
