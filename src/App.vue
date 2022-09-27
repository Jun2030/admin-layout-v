<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import AdminLayout from './index.vue';
import { useBoolean } from '@/composables';

type Mode = 'vertical' | 'horizontal';
const mode: Ref<Mode> = ref('vertical');
const modeList: Mode[] = ['vertical', 'horizontal'];
function setMode(value: Mode) {
  mode.value = value;
}

const { bool: isMobile, toggle: toggleIsMobile } = useBoolean();
const { bool: fixedHeaderAndTab, toggle: toggleFixedHeaderAndTab } = useBoolean(true);
const { bool: fixedFooter, toggle: toggleFixedFooter } = useBoolean();
const { bool: sideCollapse, setBool: setSideCollapse, toggle: toggleSideCollapse } = useBoolean();
</script>

<template>
  <AdminLayout
    :mode="mode"
    :is-mobile="isMobile"
    :fixed-header-and-tab="fixedHeaderAndTab"
    :fixed-footer="fixedFooter"
    :side-collapse="sideCollapse"
    @update:side-collapse="setSideCollapse"
  >
    <template #header>
      <div class="flex-center h-full bg-red-400">
        Header
      </div>
    </template>
    <template #tab>
      <div class="flex-center h-full bg-orange-400">
        Tab
      </div>
    </template>
    <template #side>
      <div class="h-full bg-yellow-400">
        <div class="flex-center h-56px">
          Side
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex-center h-full bg-green-400">
        Footer
      </div>
    </template>
    <div class="fixed right-0 top-120px px-12px whitespace-nowrap bg-purple-400">
      <div>
        <h4>layout mode:</h4>
        <div v-for="item in modeList" :key="item">
          <span class="pr-8px">{{ item }}</span>
          <input
            type="radio"
            name="mode"
            :value="item"
            :checked="item === mode"
            class="cursor-pointer"
            @change="setMode(item)"
          >
        </div>
      </div>
      <div class="pt-24px">
        <span class="pr-8px">isMobile</span>
        <input type="checkbox" :checked="isMobile" @change="toggleIsMobile">
      </div>
      <div class="pt-24px">
        <span class="pr-8px">fixedHeaderAndTab</span>
        <input type="checkbox" :checked="fixedHeaderAndTab" @change="toggleFixedHeaderAndTab">
      </div>
      <div class="pt-24px">
        <span class="pr-8px">fixedFooter</span>
        <input type="checkbox" :checked="fixedFooter" @change="toggleFixedFooter">
      </div>
      <div class="pt-24px">
        <span class="pr-8px">sideCollapse</span>
        <input type="checkbox" :checked="sideCollapse" @change="toggleSideCollapse">
      </div>
    </div>
    <div v-for="i in 50" :key="i" class="text-center bg-blue-400">
      {{ i }}
    </div>
  </AdminLayout>
</template>
