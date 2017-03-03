import { beforeEach, describe, given, it } from './';

import { Test } from '../types';
import { equals } from '4.5';

let x = 0;

export const test: Test = describe('beforeEach', [
  given(`a function and an array of tests`, [
    beforeEach(() => { x++; }, [
      it('runs beforeEach test', () => {
        return equals(1, x);
      }),

      it('runs beforeEach test every time', () => {
        return equals(2, x);
      }),
    ]),
  ]),
]);
