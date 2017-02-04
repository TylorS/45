import { Assertion, equals } from './';

export const assert: (bool: boolean) => Assertion = equals(true);
