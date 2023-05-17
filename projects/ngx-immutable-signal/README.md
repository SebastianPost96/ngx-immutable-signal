# ngx-immutable-signal

Immutable Signals for Angular 16+.

## Description

This library provides a `immutableSignal` function to create an Immutable Signal that uses [immer](https://www.npmjs.com/package/immer) in its write functions. This results in two key differences:

1. The read value is immutable and can only be updated with the write functions `set`, `update` and `mutate`.
2. Changes inside of nested objects update the reference of parent objects. This allows you to implement efficient equality functions by comparing object references.

```ts
import { immutableSignal } from "ngx-immutable-signal";

const mySignal = immutableSignal({ foo: { bar: 0 } });

// 1. Immutable Value
mySignal().foo.bar = 5; // throws error

// 2. Reference Based Equality Function
// --- log whenever "foo" changes
const subSignal = computed(() => mySignal().foo, { equal: (a, b) => a === b });
effect(() => console.log(subSignal()));

// --- update "bar" 10 times
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    mySignal.mutate((state) => {
      state.foo.bar = Math.random();
    });
  });
}
```
