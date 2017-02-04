import { Assertion } from '../';
import { inspect } from './inspect';

export const fail = <A>(message: A): Assertion =>
  ({
    passed: false,
    message: inspect(message),
  });
