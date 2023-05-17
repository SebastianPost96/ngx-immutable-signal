# ngx-immutable-signal

Immutable Signals for Angular 16+.

## Description

This library provides a `immutableSignal` function to create an Immutable Signal that uses [immer](https://www.npmjs.com/package/immer) in its write functions. This results in two key differences:

1. The read value is immutable and can only be updated with the write functions `set`, `update` and `mutate`.
2. Changes inside of nested objects update the reference of parent objects. This allows you to implement efficient equality functions by comparing object references.

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

For simplified equality checking, the library function `derived` can be used. It works like `computed`, but replaces the second parameter with a string to define a built-in equality function.

```ts
import { immutableSignal } from "ngx-immutable-signal";

const mySignal = immutableSignal({ name: "John Doe", numbers: [1, 2, 3, 4, 5] });

// compares equality using ===
const name = derived(() => mySignal().name);

// compares content of the resulting array
const evenNumbers = derived(() => mySignal().numbers.filter((num) => num % 2 === 0), "shallow");
```
