import { Assertion, Test } from '../';
import { bold, green, red, reset } from 'typed-colors';
import { cross, tick } from 'typed-figures';

import { EOL } from 'os';

export function success(test: Test, assertion: Assertion): string {
  return (test.showStatus ? green(tick) + ' ' : '') +
    bold(test.name) +
    reset(EOL + '  ' + assertion.message);
}

export function failure(test: Test, assertion: Assertion): string {
  return (test.showStatus ? bold(red(cross)) + ' ' : '') +
    bold(test.name) +
    reset(EOL + '  ' + assertion.message) + EOL;
}
