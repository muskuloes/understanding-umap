import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import { mdsvex } from "mdsvex";

const production = !process.env.ROLLUP_WATCH;

const figure = process.env.FIGURE;
let input = "src/main.js";
if (figure === "cech") {
  input = "src/figures/cech_visualization/main.js";
} else if (figure === "comparison") {
  input = "src/figures/comparison_visualization/main.js";
} else if (figure === "line") {
  input = "src/figures/line_rotation/main.js";
} else if (figure === "fmnist") {
  input = "src/figures/fmnist_visualization/main.js";
} else if (figure === "hyperparameters") {
  input = "src/figures/hyperparameters_visualization/main.js";
} else if (figure === "mammoth-umap") {
  input = "src/figures/mammoth_visualization/umap.js";
} else if (figure === "mammoth-tsne") {
  input = "src/figures/mammoth_visualization/tsne.js";
} else if (figure === "optimize") {
  input = "src/figures/graph_optimization/main.js";
} else if (figure === "toy") {
  input = "src/figures/toy_visualization/main.js";
} else if (figure === "toy_comparison") {
  input = "src/figures/toy_comparison_visualization/main.js";
}

export default {
  input,
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      extensions: [".svelte", ".svx"],
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      },
      preprocess: mdsvex({
        extension: ".svx"
      })
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs(),
    json(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
