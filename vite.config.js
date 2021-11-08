import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import deleteFilesPlugin from "rollup-plugin-delete";
import cssInJsPlugin from "./src/css-in-js-rollup-plugin.js";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    cssInJsPlugin(),
    deleteFilesPlugin({
      targets: ["dist/media"],
      hook: "generateBundle",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/big-shot.vue"),
      name: "BigShot",
      fileName: (format) => `big-shot.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
