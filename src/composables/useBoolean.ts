import { ref } from 'vue-demi';
import type { Ref } from 'vue-demi';

export function useBoolean(initValue = false) {
  const bool: Ref<boolean> = ref(initValue);

  const setBool = (value: boolean): void => {
    bool.value = value;
  };

  const setTrue = (): void => {
    setBool(true);
  };

  const setFalse = (): void => {
    setBool(false);
  };

  const toggle = (): void => {
    setBool(!bool.value);
  };

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  };
}
