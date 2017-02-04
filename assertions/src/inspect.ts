const objInspect: (x: any) => string = require('object-inspect');

export function inspect(x: any): string {
  return typeof x === 'object'
    ? objInspect(x)
    : String(x);
}
