import { TestCallback } from './types';
import { tick, cross } from 'typed-figures';
import { green, bold, cyan, red } from 'typed-colors';
import { coerceToPromise } from './coerceToPromise';
import { createAssertions } from './createAssertions';

const gb = (str: string) => green(bold(str));
const rb = (str: string) => red(bold(str));

export function test<T>(testName: string, testFn: TestCallback) {
  const assertions = { count: 0 };

  return runTestFn(testFn, assertions)
    .then((result: T) => {
      if (assertions.count >= 1) {
        console.log(gb(`${tick}`) + ` - ` + cyan(testName));
        return result;
      }

      throw new Error(`No assertions have been used.`);
    })
    .catch((err: any) => {
      console.error(rb(`${cross}`) + ` - ` + cyan(testName));
      console.error(err);
      throw err;
    });
}

function runTestFn(testFn: TestCallback, assertions: { count: number }) {
  return coerceToPromise(testFn(createAssertions(assertions)));
}
