const sass = require("rollup-plugin-sass");
const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [sass({ insert: true ,  output: 'dist/styles.css' }), typescript()],
  external: ['react', 'react-dom']
}