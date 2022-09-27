<script setup lang="ts">
import type { ComputedRef, WritableComputedRef } from 'vue-demi';
import { computed } from 'vue-demi';
import type { CNode } from 'css-render';
import CssRender from 'css-render';
import { LayoutFooter, LayoutHeader, LayoutMain, LayoutSide, LayoutTab } from './components';
import { useFixedTransformStyle } from '@/composables';

interface Props {
  /* 布局模式 */
  mode?: 'vertical' | 'horizontal';
  /* 是否是移动端 */
  isMobile?: boolean;
  /* 移动端时遮罩背景颜色 */
  maskBg?: string;
  /* 是否启用最小宽度的布局 */
  useMinWidthLayout?: boolean;
  /* 最小宽度 */
  minWidth?: number;
  /* 头部可见 */
  headerVisible?: boolean;
  /* 头部高度 */
  headerHeight?: number;
  /* 标签可见 */
  tabVisible?: boolean;
  /* 标签页高度 */
  tabHeight?: number;
  /* 固定头部和标签 */
  fixedHeaderAndTab?: boolean;
  /* 给主体内容添加禁止溢出 */
  addMainOverflowHidden?: boolean;
  /* 底部可见 */
  footerVisible?: boolean;
  /* 底部高度 */
  footerHeight?: number;
  /* 固定底部 */
  fixedFooter?: boolean;
  /* 侧边可见 */
  sideVisible?: boolean;
  /* 侧边栏高度 */
  sideWidth?: number;
  /* 侧边栏折叠状态的高度 */
  sideCollapsedWidth?: number;
  /* 侧边栏折叠状态 */
  sideCollapse?: boolean;
  /* 动画过渡时间 */
  transitionDuration?: number;
  /* 动画过渡速度曲线 */
  transitionTimingFunction?: string;
}
interface Emits {
  (e: 'update:side-collapse', collapse: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  isMobile: false,
  maskBg: 'rgba(0,0,0,0.3)',
  useMinWidthLayout: false,
  minWidth: 1200,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 44,
  fixedHeaderAndTab: true,
  addMainOverflowHidden: false,
  footerVisible: true,
  footerHeight: 48,
  fixedFooter: true,
  sideVisible: true,
  sideWidth: 200,
  sideCollapsedWidth: 64,
  sideCollapse: false,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

const emit = defineEmits<Emits>();

defineOptions({ name: 'AdminLayout' });

const style: ComputedRef<string> = computed((): string => (props.useMinWidthLayout ? `min-width: ${props.minWidth}px;` : ''));

// fixed布局时，应用translateX样式(水平方向出现滚动条，拖动滚动条时，fixed元素跟着滚动)
const hasFixedEl: ComputedRef<boolean> = computed((): boolean => props.useMinWidthLayout && (props.fixedHeaderAndTab || props.fixedFooter));
const transformStyle: ComputedRef<string> = useFixedTransformStyle(hasFixedEl);
const headerAndTabTransform: ComputedRef<string> = computed((): string => (props.fixedHeaderAndTab ? transformStyle.value : ''));
const footerTransform: ComputedRef<string> = computed((): string => (props.fixedFooter ? transformStyle.value : ''));

/* 各个子组件的公共属性 */
const commonProps = computed(() => {
  const { transitionDuration, transitionTimingFunction } = props;
  return {
    transitionDuration,
    transitionTimingFunction,
  };
});

/* 水平布局 */
const isVertical: ComputedRef<boolean> = computed((): boolean => props.mode === 'vertical');

// fixed布局时的层级
const headerZIndex = 1001;
const tabZIndex = 999;
const sideZIndex: ComputedRef<1003 | 1000> = computed((): 1003 | 1000 => (props.isMobile || isVertical.value ? 1003 : 1000));
const footerZIndex = 998;

const sideCollapseStatus: WritableComputedRef<boolean> = computed({
  get(): boolean {
    return props.sideCollapse;
  },
  set(collapse: boolean): void {
    emit('update:side-collapse', collapse);
  },
});
function handleClickMask() {
  sideCollapseStatus.value = true;
}

const showMask: ComputedRef<boolean> = computed(() => props.isMobile && !sideCollapseStatus.value);

const sideStyle: ComputedRef<string> = computed(() => {
  const { transitionDuration, transitionTimingFunction } = props;
  const sStyle = `background-color:${props.maskBg};transition-duration:${transitionDuration}ms;transition-timing-function:${transitionTimingFunction};`;
  return sStyle;
});

/* 侧边宽度 */
const currentSideWidth: ComputedRef<number> = computed((): number => {
  const { sideWidth, sideCollapsedWidth } = props;
  const collapseWidth: number = props.isMobile ? 0 : sideCollapsedWidth;
  const width: number = sideCollapseStatus.value ? collapseWidth : sideWidth;
  return props.sideVisible ? width : 0;
});

const commonPaddingLeft: ComputedRef<number> = computed((): number => (props.isMobile ? 0 : currentSideWidth.value));

// 各子组件的属性
const headerPaddingLeft: ComputedRef<number> = computed((): number => (isVertical.value ? commonPaddingLeft.value : 0));
const sidePaddingTop: ComputedRef<number> = computed((): number =>
  !props.isMobile && !isVertical.value && props.headerVisible ? props.headerHeight : 0,
);
const contentPaddingTop: ComputedRef<number> = computed((): number => {
  let height = 0;
  if (props.fixedHeaderAndTab) {
    if (props.headerVisible)
      height += props.headerHeight;

    if (props.tabVisible)
      height += props.tabHeight;
  }
  return height;
});
const contentPaddingBottom: ComputedRef<number> = computed((): number => (props.fixedFooter && props.footerVisible ? props.footerHeight : 0));

/* 样式 */
const { c } = CssRender();
const cStyle: CNode = c(
  '.admin-layout',
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  [
    c('&-side-mask', {
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1002,
      width: '100%',
      height: '100%',
      transitionProperty: 'background-color',
    }),
  ],
);
cStyle.render();
cStyle.mount();
</script>

<template>
  <div class="admin-layout" :style="style">
    <LayoutHeader
      v-if="headerVisible"
      v-bind="commonProps"
      :fixed="fixedHeaderAndTab"
      :z-index="headerZIndex"
      :min-width="minWidth"
      :height="headerHeight"
      :padding-left="headerPaddingLeft"
      :style="headerAndTabTransform"
    >
      <slot name="header" />
    </LayoutHeader>
    <LayoutTab
      v-if="tabVisible"
      v-bind="commonProps"
      :fixed="fixedHeaderAndTab"
      :z-index="tabZIndex"
      :min-width="minWidth"
      :top="headerHeight"
      :height="tabHeight"
      :padding-left="commonPaddingLeft"
      :style="headerAndTabTransform"
    >
      <slot name="tab" />
    </LayoutTab>
    <LayoutSide
      v-if="sideVisible"
      v-bind="commonProps"
      :z-index="sideZIndex"
      :width="currentSideWidth"
      :padding-top="sidePaddingTop"
    >
      <slot name="side" />
    </LayoutSide>
    <div v-if="showMask" class="admin-layout-side-mask" :style="sideStyle" @click="handleClickMask" />
    <LayoutMain
      v-bind="commonProps"
      :padding-top="contentPaddingTop"
      :padding-bottom="contentPaddingBottom"
      :padding-left="commonPaddingLeft"
      :overflow-hidden="addMainOverflowHidden"
    >
      <slot />
    </LayoutMain>
    <LayoutFooter
      v-if="footerVisible"
      v-bind="commonProps"
      :fixed="fixedFooter"
      :z-index="footerZIndex"
      :min-width="minWidth"
      :height="footerHeight"
      :padding-left="commonPaddingLeft"
      :style="footerTransform"
    >
      <slot name="footer" />
    </LayoutFooter>
  </div>
</template>
