export type Assertion
  = FailedAssertion
  | SuccessfulAssertion;

export interface FailedAssertion
  {
    passed: false;
    message: string;
  };

export interface SuccessfulAssertion
  {
    passed: true;
  }
