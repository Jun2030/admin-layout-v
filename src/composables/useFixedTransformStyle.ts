import { computed, onUnmounted, ref, watch } from 'vue-demi';
import type { ComputedRef, Ref } from 'vue-demi';

/**
 * @description  :使用了固定定位的布局元素添加translateX
 * @param         {Ref} isFixed 是否是fixed布局
 * @return        {*}
 */
export function useFixedTransformStyle(isFixed: Ref<boolean> | ComputedRef<boolean>): ComputedRef<string> {
  const scrollLeft: Ref<number> = ref(0);
  const transformStyle: ComputedRef<string> = computed((): string => `transform: translateX(${-scrollLeft.value}px);`);

  /* 是否初始化过 */
  let isInit = false;

  const scrollHandler = (): void => {
    const sLeft: number = document.scrollingElement?.scrollLeft || 0;
    scrollLeft.value = sLeft;
  };
  const initScrollLeft = (): void => {
    scrollHandler();
  };

  const addScrollEventListener = (): void => {
    document.addEventListener('scroll', scrollHandler);
  };

  const removeScrollEventListener = (): void => {
    if (!isInit) return;
    document.removeEventListener('scroll', scrollHandler);
  };

  const init = (): void => {
    initScrollLeft();
    addScrollEventListener();
    isInit = true;
  };

  watch(
    isFixed,
    (newValue) => {
      if (newValue)
        init();
      else
        removeScrollEventListener();
    },
    { immediate: true },
  );

  onUnmounted(() => {
    removeScrollEventListener();
  });

  return transformStyle;
}
