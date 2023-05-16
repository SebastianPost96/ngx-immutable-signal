import { WritableSignal, signal } from '@angular/core';
import { produce } from 'immer';

/** Create a `Signal` with immutable state that can be set or updated directly.*/
export function immutableSignal<T>(
  ...args: Parameters<typeof signal<T>>
): WritableSignal<T> {
  const [value, ...rest] = args;
  const s = signal(
    produce(value, (v) => v),
    ...rest
  );

  return new Proxy(s, {
    get(target, property: keyof WritableSignal<T>, receiver) {
      switch (property) {
        case 'mutate':
          return (mutatorFn: (val: T) => void) => {
            return target.update((val) => produce(val, mutatorFn));
          };
        case 'set':
          return (val: T) => {
            return target.set(produce(val, (v) => v));
          };
        case 'update':
          return (updateFn: (val: T) => T) => {
            return target.update((val) => produce(val, updateFn));
          };
        default:
          return Reflect.get(target, property, receiver);
      }
    },
  });
}
