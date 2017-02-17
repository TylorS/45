import { chain, describe, equals, given, it, map } from './src';

const add1 = (n: number) => n + 1;

export const test = describe('45', [
  given('stuff', [
    it('does things', () => chain(equals(2), map(add1, equals(1, 1)))),

    it('fails sometimes', () => chain(equals(2), equals(1, 1))),
  ]),
]);
