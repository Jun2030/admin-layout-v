<script lang="ts" setup>
import type { ComputedRef } from 'vue-demi';
import { computed } from 'vue-demi';
import type { CNode } from 'css-render';
import CssRender from 'css-render';

type PositionType = 'fixed' | 'static';
interface Props {
  /** 开启fixed布局 */
  fixed?: boolean;
  /** fixed布局的top距离 */
  top?: number;
  /** fixed布局的层级 */
  zIndex?: number;
  /** 是否启用最小宽度的布局 */
  useMinWidthLayout?: boolean;
  /** 最小宽度 */
  minWidth?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡效果 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  top: 56,
  zIndex: 999,
  minWidth: 1200,
  height: 56,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

defineOptions({ name: 'LayoutTab' });

const style: ComputedRef<string> = computed((): string => {
  const { fixed, top, zIndex, minWidth, height, paddingLeft, transitionDuration, transitionTimingFunction } = props;
  const position: PositionType = fixed ? 'fixed' : 'static';
  const minWidthStyle: string = props.useMinWidthLayout ? `min-width: ${minWidth}px;` : '';
  return `position: ${position}; top: ${top}px; z-index: ${zIndex}; ${minWidthStyle} height: ${height}px; padding-left: ${paddingLeft}px; transition-duration: ${transitionDuration}ms; transition-timing-function: ${transitionTimingFunction};`;
});

/* 样式 */
const { c } = CssRender();
const cStyle: CNode = c('.admin-layout-tab', {
  left: 0,
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '100%',
  transitionProperty: 'padding-left',
});
cStyle.render();
cStyle.mount();
</script>

<template>
  <div class="admin-layout-tab" :style="style">
    <slot />
  </div>
</template>
