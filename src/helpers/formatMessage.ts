import { bold, green, red } from 'typed-colors';
import { cross, tick } from 'typed-figures';

import { EOL } from 'os';
import { Test } from '../';
import { padNewLine } from './padNewLine';

export function success(test: Test): string {
  return (test.showStatus ? green(tick) + ' ' : '') + bold(test.name);
}

export function failure(test: Test, message: string): string {
  return (test.showStatus ? bold(red(cross)) + ' ' : '') +
    bold(test.name + EOL + '  ') + padNewLine(message);
}
