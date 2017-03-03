import { Assertion, Observable, TestFn, chain, fail, pass } from '../';

import $$observable from 'symbol-observable';

export function coerceToPromise<A>(testFn: TestFn): Promise<A> {
  return new Promise((resolve) => {
    try {
      let result = testFn();

      if (isObservable(result))
        result = observableToPromise(result);

      resolve(result);
    } catch (e) {
      resolve(fail(e));
    }
  });
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
