import { Verification, pass } from '4.5';
import { calculateTimeout, coerceToPromise } from '../helpers';

import { EOL } from 'os';
import { Test } from '../types';
import { fourtyFive } from '../45';
import { sequence } from '@typed/sequence';

export function beforeEach(fn: () => any, tests: Array<Test>): Test {
  return new BeforeEach(fn, tests);
}

class BeforeEach implements Test {
  public name = '';
  public showStatus = false;
  private _timeout: number;

  constructor(private fn: () => any, private tests: Array<Test>) {
    this._timeout = calculateTimeout(tests);
  }

  get timeout() {
    return this._timeout;
  }

  set timeout(time: number) {
    this._timeout = calculateTimeout(this.tests, time);
  }

  public run() {
    const { fn, tests } = this;

    const testsWithBeforeHook = tests.map(addBeforeHook(fn));

    const testResult = { failures: 0, message: '' };

    return sequence(testsWithBeforeHook, (test: Test) => {
      return fourtyFive([test]).then(result => {
        const { failures, message } = result;

        testResult.failures += failures;
        testResult.message += message;
      });
    }).then(() => {
      const { failures, message } = testResult;

      if (!failures) {
        this.name += trimResult(message);
        return pass(void 0);
      }

      return {
        verify(verification: Verification<any>) {
          verification.failure(message);
        },
      };
    });
  }
}

function addBeforeHook(fn: () => any) {
  return function (test: Test): Test {
    return {
      name: test.name,
      timeout: test.timeout,
      showStatus: test.showStatus,
      run: () => coerceToPromise(fn).then(() => test.run()),
    };
  };
}

function trimResult (message: string) {
  return message
    .replace(new RegExp(`[${EOL}]{2,}`, 'g'), EOL)
    .trim();
};
