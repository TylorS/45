import { Assertion } from '../';
import { equals } from './';

export const assert: (bool: boolean) => Assertion = equals(true);
