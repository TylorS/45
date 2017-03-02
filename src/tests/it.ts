import { Assertion, Test, fail } from '../';
import { blue, underline } from 'typed-colors';

import { assertIsAssertion } from '../helpers';

export function it<A>(does: string, testFn: () => Assertion<A>): Test;
export function it<A>(does: string, testFn: () => Promise<Assertion<A>>): Test;

export function it<A>(does: string, testFn: () => Assertion<A> | Promise<Assertion<A>>): Test {
  return {
    showStatus: true,
    name: blue('it ') + underline(does),
    run: () => tryRunTest<A>(testFn).then(assertIsAssertion),
  };
}

function tryRunTest<A>(testFn: () => Assertion<A> | Promise<Assertion<A>>) {
  return new Promise((resolve) => {
    try {
      resolve(testFn());
    } catch (e) {
      resolve(fail(e));
    }
  });
}
