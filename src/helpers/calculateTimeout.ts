import { Test } from '../types';

const add = (x: number, y: number) => x + y;

export function calculateTimeout(tests: Array<Test>, time = 2000): number {
  return tests.map(test => test.timeout).reduce(add, time);
}
