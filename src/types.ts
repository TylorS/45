export interface Test {
  name: string;
  run(): Promise<Assertion>;
}

export type TestFn = (() => Assertion) | (() => Promise<Assertion>);

export type Assertion =
  {
    passed: boolean;
    message: string;
  };
