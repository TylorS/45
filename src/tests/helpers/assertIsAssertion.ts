import { Assertion } from '../../';

export function assertIsAssertion (x: any): Assertion {
  if (x && typeof x.passed === 'boolean' && typeof x.message === 'string')
    return x as Assertion;

  return { passed: false, message: `No assertions used` };
}
