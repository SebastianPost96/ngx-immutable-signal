# ngx-immutable-signal

Immutable Signals for Angular 16+.

## Description

This library provides a `immutableSignal` function to create an Immutable Signal which works like a regular Angular Signal. The only difference is that the state value is immutable and can only be updated with the write functions `set`, `update` and `mutate`.

```ts
import { immutableSignal } from "ngx-immutable-signal";

const mySignal = immutableSignal({ foo: "bar" });
mySignal().foo = "baz"; // throws error
```
