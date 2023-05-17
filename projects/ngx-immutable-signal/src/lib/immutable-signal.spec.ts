import { WritableSignal } from '@angular/core';
import { immutableSignal } from './immutable-signal';
import { derived } from './derived';

describe('Immutable Signal', () => {
  let testState: WritableSignal<{ a: number; b: string; c: boolean }>;

  beforeEach(async () => {
    testState = immutableSignal({
      a: 123,
      b: 'string',
      c: true,
    });
  });

  it('should mutate', () => {
    const expectedResult = 9001;
    testState.mutate((state) => {
      state.a = expectedResult;
    });

    expect(testState().a).toBe(expectedResult);
  });

  it('should set', () => {
    const c = false;
    testState.set({ ...testState(), c });

    expect(testState().c).toBe(c);
  });

  it('should update', () => {
    const b = 'hello world';
    testState.update((state) => ({ ...state, b }));

    expect(testState().b).toBe(b);
  });

  it('should be immutable', () => {
    const tryMutation = () => {
      testState().a = 5;
    };

    expect(tryMutation).toThrowError();
  });
});
