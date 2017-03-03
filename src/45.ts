import { Assertion, Test, TestResult, fail } from './';
import { failure, success, timeout } from './helpers';

import { EOL } from 'os';

export function fourtyFive(tests: Array<Test>): Promise<TestResult> {
  const result = { failures: 0, message: '' };

  return Promise.all(tests.map(runTest(result))).then(() => result);
}

function runTest(result: TestResult) {
  return function (test: Test) {
    return timeout(test.timeout, test.run())
      .then(verify(result, test), handleFailure(result, test));
  };
}

function verify(result: TestResult, test: Test) {
  return function (assertion: Assertion<any>) {
    assertion.verify({
      success() {
        result.message += success(test).trim() + EOL;
      },

      failure(message: string) {
        result.failures += 1;
        result.message += failure(test, message).trim() + EOL;
      },
    });
  };
}

function handleFailure(result: TestResult, test: Test) {
  return function (err: any) {
    result.failures +=1;
    result.message += failure(test, err).trim() + EOL;
  };
}
