import { FailedAssertion } from './';
import { inspect } from './inspect';

export const fail = <A>(message: A): FailedAssertion =>
  ({
    passed: false,
    message: inspect(message),
  });
