import { failure, success } from './helpers/formatMessage';

import { EOL } from 'os';
import { Test } from './';
import { red } from 'typed-colors';

export class FourtyFive {
  constructor (private tests: Array<Test>) {}

  public run(): Promise<{ failures: number, message: string }> {
    const tests = this.tests;

    return Promise.all(tests.map(test => test.run()))
      .then((assertions) => {
        const result =
          {
            failures: 0,
            message: EOL,
          };

        assertions.forEach((assertion, i) => {
          const test = tests[i];

          if (assertion.passed)
            return result.message += success(test, assertion);

          result.failures += 1;
          result.message += failure(test, assertion);
        });

        result.message = EOL + result.message.trim();

        if (!result.message.trim()) {
          result.failures = 1;
          result.message =  EOL + red('WARNING: ') + 'No tests were run!';
        }

        return result;
      });
  }
}
