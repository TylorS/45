import { Assertion } from '4.5';

export interface Test {
  name: string;
  timeout: number;
  run(): Promise<Assertion<any>>;
  showStatus: boolean;
}

export type TestFn = (() => Assertion<any>) | (() => Promise<Assertion<any>>);

export interface TestResult {
  failures: number;
  message: string;
}
