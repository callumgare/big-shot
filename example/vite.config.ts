import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import copyFilesPlugin from 'rollup-plugin-copy'
import deleteFilesPlugin from "rollup-plugin-delete";
import path from 'path'
import { URL } from 'url';

const rootDir = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    vue(),
    copyFilesPlugin({
      hook: 'writeBundle',
      verbose: true,
      targets: [
        { src: 'built-example/example/*', dest: 'built-example' },
        { src: 'dist/big-shot.umd.js', dest: 'built-example/assets' },
        { src: 'dist/style.css', dest: 'built-example/assets' }
      ]
    }),
    deleteFilesPlugin({
      hook: "closeBundle",
      targets: ["built-example/example"],
    }),
  ],
  base: '',
  build: {
    outDir: 'built-example',
    rollupOptions: {
      input: {
        es: path.resolve(rootDir, 'example-using-es.html'),
        umd: path.resolve(rootDir, 'example-using-umd.html'),
      },
    }
  },
});
