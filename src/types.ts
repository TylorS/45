export interface Test {
  name: string;
  run(): Promise<Assertion>;
  showStatus: boolean;
}

export interface Assert
  {
    all (assertions: Array<Assertion>): Assertion;
    assert (bool: boolean): Assertion;
    equals <A>(expected: A, actual: A): Assertion;
    equals <A>(expected: A): (actual: A) => Assertion;
    fail (message: any): Assertion;
    throws (f: () => any): Assertion;
  };

export type TestFn = ((assert: Assert) => Assertion) | ((assert: Assert) => Promise<Assertion>);

export type Assertion =
  {
    passed: boolean;
    message: string;
  };
