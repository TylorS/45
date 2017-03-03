import { Assertion, Observable, Test, TestFn, chain, fail, pass } from '../';
import { blue, underline } from 'typed-colors';

import $$observable from 'symbol-observable';
import { assertIsAssertion } from '../helpers';

export function it<A>(does: string, testFn: () => Assertion<A>): Test;
export function it<A>(does: string, testFn: () => Promise<Assertion<A>>): Test;
export function it<A>(does: string, testFn: () => Observable<Assertion<any>>): Test;

export function it<A>(does: string, testFn: TestFn): Test {
  return new It(does, testFn);
}

class It<A> implements Test {
  public showStatus: true;
  public timeout = 2000;
  public name: string;
  private _testFn: TestFn;

  constructor(does: string, testFn: TestFn) {
    this.name = blue('it ') + underline(does);
    this._testFn = testFn;
  }

  public run() {
    return new Promise((resolve) => {
      try {
        let result = this._testFn();

        if (isObservable(result))
          result = observableToPromise(result);

        resolve(result);
      } catch (e) {
        resolve(fail(e));
      }
    })
      .then(assertIsAssertion);
  }
}

function isObservable(x: any): x is Observable<any> {
  return typeof x[$$observable] === 'function';
}

function observableToPromise<A>(obs: Observable<Assertion<A>>): Promise<Assertion<A>> {
  return new Promise((resolve) => {
    let _assertion: Assertion<A> = pass(`Test Passed`) as any as Assertion<A>;

    obs.subscribe({
      next: (assertion: Assertion<A>) => {
        _assertion = chain(() => assertion, _assertion);
      },
      error: (err) => {
        resolve(fail(err));
      },
      complete: () => {
        resolve(_assertion);
      },
    });
  });
}
