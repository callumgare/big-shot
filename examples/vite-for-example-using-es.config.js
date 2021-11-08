import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import cssInJsPlugin from "../src/css-in-js-rollup-plugin.js";
import { defineConfig } from "vite";
import copyFilesPlugin from 'rollup-plugin-copy'
import deleteFilesPlugin from "rollup-plugin-delete";
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    cssInJsPlugin(),
    copyFilesPlugin({
      hook: 'writeBundle',
      verbose: true,
      targets: [
        { src: 'built-examples/examples/*', dest: 'built-examples' },
        { src: 'dist/big-shot.umd.js', dest: 'built-examples/assets' }
      ]
    }),
    deleteFilesPlugin({
      hook: "closeBundle",
      targets: ["built-examples/examples"],
    }),
  ],
  base: '',
  build: {
    outDir: 'built-examples',
    rollupOptions: {
      input: {
        es: path.resolve(__dirname, 'example-using-es.html'),
        umd: path.resolve(__dirname, 'example-using-umd.html'),
      },
    }
  },
});
