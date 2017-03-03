import { Assertion, Test, Verification, fourtyFive, pass } from '../';
import { blue, underline } from 'typed-colors';
import { calculateTimeout, padNewLine } from '../helpers';

import { EOL } from 'os';

export function describe(thing: string, tests: Array<Test>): Test {
  return new Describe(thing, tests);
}

export class Describe implements Test {
  public name: string;
  public showStatus = false;
  private _tests: Array<Test>;
  private _timeout: number;

  constructor(name: string, tests: Array<Test>) {
    this.name = blue('Describe ') + underline(name);
    this._tests = tests;
    this._timeout = calculateTimeout(tests);
  }

  get timeout() {
    return this._timeout;
  }

  set timeout(time: number) {
    this._timeout = calculateTimeout(this._tests, time);
  }

  public run(): Promise<Assertion<any>> {
    const { _tests } = this;

    return fourtyFive(_tests).then(testResult => {
      const { message, failures } = testResult;

      if (!failures) {
        this.name += EOL + '  ' + padNewLine(message);
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
