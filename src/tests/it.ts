import { Assertion, Observable, Test, TestFn } from '../';
import { assertIsAssertion, coerceToPromise } from '../helpers';
import { blue, underline } from 'typed-colors';

export function it<A>(does: string, testFn: () => Assertion<A>): Test;
export function it<A>(does: string, testFn: () => Promise<Assertion<A>>): Test;
export function it<A>(does: string, testFn: () => Observable<Assertion<any>>): Test;

export function it<A>(does: string, testFn: TestFn): Test {
  return new It(does, testFn);
}

class It<A> implements Test {
  public showStatus = true;
  public timeout = 2000;
  public name: string;
  private _testFn: TestFn;

  constructor(does: string, testFn: TestFn) {
    this.name = blue('it ') + underline(does);
    this._testFn = testFn;
  }

  public run() {
    return coerceToPromise(this._testFn).then(assertIsAssertion);
  }
}
