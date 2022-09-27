<script lang="ts" setup>
import type { ComputedRef } from 'vue-demi';
import { computed } from 'vue-demi';
import type { CNode } from 'css-render';
import CssRender from 'css-render';

interface Props {
  /* fixed布局的层级 */
  zIndex?: number;
  /* 宽度 */
  width?: number;
  /* 是否展开 */
  collapse?: boolean;
  /* 顶部内边距 */
  paddingTop?: number;
  /* 动画过渡时间 */
  transitionDuration?: number;
  /* 动画过渡效果 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  zIndex: 1002,
  width: 200,
  collapse: false,
  paddingTop: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

defineOptions({ name: 'LayoutSide' });

const style: ComputedRef<string> = computed((): string => {
  const { zIndex, width, paddingTop, transitionDuration, transitionTimingFunction } = props;
  return `z-index: ${zIndex}; width: ${width}px; padding-top: ${paddingTop}px; transition-duration: ${transitionDuration}ms; transition-timing-function :${transitionTimingFunction};`;
});

/* 样式 */
const { c } = CssRender();
const cStyle: CNode = c('.admin-layout-side', {
  position: 'fixed',
  left: 0,
  top: 0,
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  transitionProperty: 'all',
});
cStyle.render();
cStyle.mount();
</script>

<template>
  <div class="admin-layout-side" :style="style">
    <slot />
  </div>
</template>
