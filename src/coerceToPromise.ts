export function coerceToPromise(x: any): Promise<any> {
  return x && typeof x.subscribe === 'function'
    ? observableToPromise(x)
    : x && typeof x.drain === 'function'
      ? x.drain()
      : Promise.resolve(x);
}

function observableToPromise(x: any) {
  return new Promise((resolve, reject) => {
    x.subscribe(createObserver(resolve, reject));
  });
}

function createObserver(resolve: Function, reject: Function) {
  return {
    next: Function.prototype,
    error: reject,
    complete: resolve,
  };
}
