import { blue, bold, underline } from 'typed-colors';
import { failure, success } from '../helpers/formatMessage';

import { EOL } from 'os';
import { Test } from '../';
import { padNewLine } from '../helpers/padNewLine';

export function describe(category: string, tests: Array<Test>): Test {
  return {
    name: blue('Describe ' + underline(category)),
    showStatus: false,
    run() {
      return Promise.all(tests.map(test => test.run()))
        .then(assertions => {
          let result = { passed: true, message: '' };

          assertions.forEach((assertion, i) => {
            const test = tests[i];

            if (assertion.passed)
              return result.message += success(test, assertion);

            result.passed = false;
            result.message += EOL + failure(test, assertion);
          });

          result.message = padNewLine(result.message).trim() + EOL;

          return result;
        });
    },
  };
}

export const given = (parameters: string, tests: Test[]): Test =>
  ({
    name: bold(blue('given') + ' ' + parameters),
    showStatus: false,
    run: () => describe(parameters, tests).run(),
  });
