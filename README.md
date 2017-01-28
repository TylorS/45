# 45

> A simple test runner

<!-- Write a short summary about your library here -->

## Let me have it!
```sh
npm install --save 45
```

## API

### `test(testName: string, testFn: TestCallback): Promise<any>`

Run some tests :)

```typescript
import { test } from '45';

test('Fails without assertions', () => {})

test('Things are all good', ({ eq }) => { eq(1, 1) })

test('Supports promises', ({ eq }) => {
  return Promise.resolve(1).then(eq(1))
})
```

## Types

### TestCallback
```typescript
export interface TestCallback {
  (assertions: Assertions): any;
}
```

### Assertions
```typescript
export interface Assertions {
  eq<A> (expected: A, actual: A): A;
  eq<A> (expected: A): (actual: A) => A;

  is<A> (expected: A, actual: A): A;
  is<A> (expected: A): (actual: A) => A;

  assert (b: boolean): boolean;

  throws<E extends Error> (f: () => any): E;

  fail<A> (message: A): void;
}
```