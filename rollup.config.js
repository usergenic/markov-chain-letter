import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  output: {
    format: 'esm',
    name: 'MarkovChainLetter'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
