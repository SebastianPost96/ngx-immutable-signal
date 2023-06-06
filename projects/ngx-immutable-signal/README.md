# ngx-immutable-signal

Immutable Signals with improved change detection for Angular 16+.

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

// 2. updated parent reference
mySignal.mutate((state) => {
  state.foo = "baz";
});
console.log(mySignal() === initialValue); // false
```

For optimized change detection, the library provides a `derived` function.  It works like `computed`, but replaces the second parameter with three pre-defined equality functions.

```ts
import { immutableSignal, derived } from "ngx-immutable-signal";

const mySignal = immutableSignal({ name: "John Doe", numbers: [1, 2, 3, 4, 5] });

// default - checks for equality using ===
// will only emit an update if a change was detected
const name = derived(() => mySignal().name);

// checks for equality by comparing items in the resulting array
const evenNumbers = derived(() => mySignal().numbers.filter((num) => num % 2 === 0), "shallow");

// checks for equality using an optimized deep compare algorithm
const deepCopy = derived(() => JSON.parse(JSON.stringify(mySignal())), "deep");
```
