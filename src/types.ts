export interface TestCallback {
  (assertions: Assertions): any;
}

export interface Assertions {
  eq<A> (expected: A, actual: A): A;
  eq<A> (expected: A): (actual: A) => A;

  is<A> (expected: A, actual: A): A;
  is<A> (expected: A): (actual: A) => A;

  assert (b: boolean): boolean;

  throws<E extends Error> (f: () => any): E;

  fail<A> (message: A): void;
}
