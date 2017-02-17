import { blue, underline } from 'typed-colors';

import { Describe } from './describe';
import { Test } from '../';

export function given(parameters: string, tests: Array<Test>): Test {
  return new Given(parameters, tests);
}

class Given extends Describe {
  constructor(parameters: string, tests: Array<Test>) {
    super(parameters, tests);

    this.name = blue('given') + ' ' + underline(parameters);
  }
}
