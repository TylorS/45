import { Assertion, Test, Verification, fourtyFive, pass } from '../';
import { blue, underline } from 'typed-colors';

import { EOL } from 'os';
import { padNewLine } from '../helpers';

export function describe(thing: string, tests: Array<Test>): Test {
  return new Describe(thing, tests);
}

export class Describe implements Test {
  public name: string;
  public showStatus: false;
  private tests: Array<Test>;

  constructor(name: string, tests: Array<Test>) {
    this.name = blue('Describe ') + underline(name);
    this.tests = tests;
  }

  public run(): Promise<Assertion<any>> {
    const { tests } = this;

    return fourtyFive(tests).then(testResult => {
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
