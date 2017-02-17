import { Assertion, fail } from '../';

export function assertIsAssertion (x: any): Assertion<any> {
  if (x && typeof x.verify === 'function')
    return x as Assertion<any>;

  return fail('No assertions were returned');
}
