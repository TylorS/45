import { Assertion, Test } from '../';
import { blue, underline } from 'typed-colors';

import { assertIsAssertion } from '../helpers';

export function it<A>(does: string, testFn: () => Assertion<A>): Test;
export function it<A>(does: string, testFn: () => Promise<Assertion<A>>): Test;

export function it<A>(does: string, testFn: () => Assertion<A> | Promise<Assertion<A>>): Test {
  return {
    showStatus: true,
    name: blue('it ') + underline(does),
    run: () => Promise.resolve(testFn()).then(assertIsAssertion),
  };
}
