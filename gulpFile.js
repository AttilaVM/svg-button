const gulp = require('gulp');
const rollup = require('rollup');
// rollup plugins
const babel = require("rollup-plugin-babel");
const rootImport = require("rollup-plugin-root-import");
const eslint = require("rollup-plugin-eslint");
const resolve = require("rollup-plugin-node-resolve");
const uglify = require('rollup-plugin-uglify');

gulp.task('demo-build', function demoBuildTask() {
	return rollup.rollup({
    input: "src/button.js",
  plugins: [
    eslint({
      exclude: [
        "src/styles/**"
      ]}),
    babel({ babelrc: false,
      presets: ["es2015-rollup"],
      exclude: "node_modules/**"
    }),
    rootImport({
      root: `${__dirname}/src`,
      useEntry: "prepend",
      extensions: ".js"
    }),
    resolve({
      browser: true
    })]
  })
    .then((bundle) => {
      return bundle.write({
      name: "button",
      file: "./demo/button.js",
      format: "iife"
      });
    });
});

gulp.task('dist-build', function demoBuildTask() {
	return rollup.rollup({
    input: "src/button.js",
    plugins: [
      uglify(),
    eslint({
      exclude: [
        "src/styles/**"
      ]}),
    babel({ babelrc: false,
      presets: ["es2015-rollup"],
      exclude: "node_modules/**"
    }),
    rootImport({
      root: `${__dirname}/src`,
      useEntry: "prepend",
      extensions: ".js"
    }),
    resolve({
      browser: true
    })]
  })
    .then((bundle) => {
      return bundle.write({
        name: "button",
        file: "./dist/button.js",
        format: "iife"
      });
    });
});

gulp.task("default", function defaultTask() {
  gulp.watch(["./src/**/*"], ["demo-build", "dist-build"]);
});
