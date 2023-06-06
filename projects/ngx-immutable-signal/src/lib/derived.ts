import { Signal, computed } from '@angular/core';
import { deepEqual, shallowEqual } from 'fast-equals';

/** Create a computed Signal and provides a predefined equality function.
 * @param equalityDefinition
 * A string that determines the behaviour of the equality function.
 *
 * - `default` - Checks for equality using the `===` operator
 * - `shallow` - Performs default check. if false, compares values based on their first depth of values.
 * - `deep` - Performs default check. if false, compares values based on their full depth of values.
 */
export function derived<T>(
  computation: () => T,
  equalityDefinition: 'default' | 'shallow' | 'deep' = 'default'
): Signal<T> {
  let equal: (a: T, b: T) => boolean;

  switch (equalityDefinition) {
    case 'default':
      equal = (a, b) => a === b;
      break;
    case 'shallow':
      equal = shallowEqual;
      break;
    case 'deep':
      equal = deepEqual;
      break;
  }

  return computed(computation, { equal });
}
