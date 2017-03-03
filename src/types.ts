import { Assertion } from '4.5';

export type Test =
  {
    name: string;
    timeout: number;
    showStatus: boolean;
    run(): Promise<Assertion<any>>;
  };

export type TestFn =
  (() => Assertion<any>) |
  (() => Promise<Assertion<any>>) |
  (() => Observable<Assertion<any>>);

export interface TestResult {
  failures: number;
  message: string;
}

export type Observable<A> =
  {
    subscribe(observer: Observer<A>): Subscription;
  };

export type Observer<A> =
  {
    next(value: A): any;
    error(err: any): any;
    complete(): any;
  };

export type Subscription =
  {
    unsubscribe(): any;
  };
