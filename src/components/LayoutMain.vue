<script lang="ts" setup>
import type { ComputedRef } from 'vue-demi';
import { computed } from 'vue-demi';
import type { CNode } from 'css-render';
import CssRender from 'css-render';

interface Props {
  /** 顶部内边距 */
  paddingTop?: number;
  /** 底部内边距 */
  paddingBottom?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 是否禁止溢出 */
  overflowHidden?: boolean;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡效果 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

defineOptions({ name: 'LayoutMain' });

const style: ComputedRef<string> = computed((): string => {
  const { paddingTop, paddingBottom, paddingLeft, transitionDuration, transitionTimingFunction } = props;
  const overflowStyle = `overflow: ${props.overflowHidden ? 'hidden' : 'visible'};`;
  return `padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px; padding-left: ${paddingLeft}px; ${overflowStyle} transition-duration: ${transitionDuration}ms; transition-timing-function: ${transitionTimingFunction};`;
});

/* 样式 */
const { c } = CssRender();
const cStyle: CNode = c('.admin-layout-main', {
  flexGrow: 1,
  boxSizing: 'border-box',
  width: '100%',
  transitionProperty: 'padding-left',
});
cStyle.render();
cStyle.mount();
</script>

<template>
  <main class="admin-layout-main" :style="style">
    <slot />
  </main>
</template>
