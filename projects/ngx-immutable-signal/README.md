# ngx-immutable-signal

Immutable Signals for Angular 16+.

## Description

This library provides a `immutableSignal` function to create an Immutable Signal that uses [immer](https://www.npmjs.com/package/immer) in its write functions.

1. The read value is immutable and can only be updated with the write functions `set`, `update` and `mutate`.
2. Changes inside of nested objects update the reference of parent objects.

```ts
import { immutableSignal } from "ngx-immutable-signal";

const initialValue = { foo: "bar" };

// 1. immutable value
const mySignal = immutableSignal(initialValue);
mySignal().foo = "baz"; // throws error

// 2. new parent reference
mySignal.mutate((state) => {
  state.foo = "baz";
});
console.log(mySignal() === initialValue); // false
```
