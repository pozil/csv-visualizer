import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/main.js',
    output: [
        {
            name: 'CsvVisualizer',
            file: 'dist/csv-visualizer.js',
            format: 'iife'
        },
        {
            name: 'CsvVisualizer',
            file: 'dist/csv-visualizer.min.js',
            format: 'iife',
            plugins: [terser()]
        }
    ],
    plugins: [nodeResolve({ browser: true }), commonjs()]
};
