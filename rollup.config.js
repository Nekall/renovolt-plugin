import { terser } from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import { string } from "rollup-plugin-string";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.js",
  output: {
    file: "dist/renovolt-plugin.js",
    format: "iife",
    name: "RenovoltPlugin",
    banner:
      "// Revolt Renovolt Plugin v0.0.1\n// Generated automatically - Do not edit directly",
  },
  plugins: [
    // Bundle CSS files
    postcss({
      extract: false, // Inline CSS in JS
      inject: false, // Don't auto-inject, we'll handle it manually
      plugins: [autoprefixer(), ...(isProduction ? [cssnano()] : [])],
    }),

    // Bundle HTML templates as strings
    string({
      include: "**/*.html",
    }),

    // Minify in production
    isProduction &&
      terser({
        compress: {
          drop_console: false, // Keep console.log for debugging
          drop_debugger: true,
        },
        mangle: {
          keep_fnames: true, // Keep function names for debugging
        },
      }),
  ].filter(Boolean),
};
