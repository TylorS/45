export function coerceToPromise(x: any): Promise<any> {
  return Promise.resolve(x);
}
