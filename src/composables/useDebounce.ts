import { ref, watchEffect, type MaybeRef, toValue } from 'vue';
import { debounce, type AnyCallbackFunc } from '@/lib/utils';

export const useDebounce = <F extends AnyCallbackFunc>(
  callback: F,
  delay: MaybeRef<number>
) => {
  const callbackRef = ref(callback);

  // Update callback reference when it changes
  watchEffect(() => {
    callbackRef.value = callback;
  });

  // Create debounced version that updates when delay changes
  const debouncedFn = ref(
    debounce((...args: Parameters<F>) => {
      callbackRef.value(...args);
    }, toValue(delay))
  );

  // Update debounced function when delay changes
  watchEffect(() => {
    debouncedFn.value = debounce(
      (...args: Parameters<F>) => callbackRef.value(...args),
      toValue(delay)
    );
  });

  return debouncedFn.value;
};