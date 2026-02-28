// vite.config.js
import {defineConfig} from 'vite';
import {prezAsAdoc} from '@tblaisot/prez-as-adoc/vite/plugins';

export default defineConfig({
    global: '({})',
    base: './',
    root: './src',
    build: {
        outDir: '../dist/',
        minify: false,
        cssMinify: false,
    },
    plugins: [
        prezAsAdoc({
            slidesTemplates: [
                './src/slides-templates',
                '@tblaisot/prez-as-adoc/slides-templates/templates'
            ]
        }),
    ]
})
