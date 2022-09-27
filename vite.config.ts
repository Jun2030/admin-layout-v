import { resolve } from 'path';
import { defineConfig } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Dts from 'vite-plugin-dts';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';

export const pathResolve = (pathStr: string): string => resolve(__dirname, '.', pathStr);

export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  plugins: [Vue(), DefineOptions(), Unocss(), Dts({
    include: ['./src/index.ts', './src/index.vue'],
  })],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AdminLayoutV',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
