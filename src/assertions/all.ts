import { Assertion } from '../';

export function all(assertions: Array<Assertion>): Assertion {
  const seed = { passed: true, message: `` };

  return assertions.reduce((acc, assertion) => {
    if (!assertion.passed) {
      acc.message += assertion.message;
      acc.passed = false;
    }

    return acc;
  }, seed);
}
