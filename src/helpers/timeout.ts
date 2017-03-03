export function timeout(ms: number, promise: Promise<any>): Promise<any> {
  let _resolve: Function;
  let _reject: Function;

  const p  = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  const id = setTimeout(() => _reject(`Timeout: Test did not complete before ${ms}ms timeout`), ms);

  promise
    .then(x => {
      clearTimeout(id);
      _resolve(x);
    })
    .catch(err => {
      clearTimeout(id);
      _reject(err);
    });

  return p;
}
