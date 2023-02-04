import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";
import { URL } from 'url';

const rootDir = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib: {
      entry: path.resolve(rootDir, "src/big-shot.vue"),
      name: "BigShot",
      fileName: (format) => `big-shot.${format}.js`
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
})
