import { Test } from '../types';
import { curry } from '@typed/curry';

export const timeout: TimeoutFn = curry(function timeout(ms: number, test: Test) {
  test.timeout = ms;

  return test;
});

export interface TimeoutFn {
  (ms: number, test: Test): Test;
  (ms: number): (test: Test) => Test;
}
