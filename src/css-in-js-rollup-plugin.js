"use strict";
// Based off https://github.com/Marco-Prontera/vite-plugin-css-injected-by-js
export default function getCssInJsRollupPlugin() {
    return {
        apply: 'build',
        enforce: 'post',
        name: 'css-in-js-plugin',
        generateBundle(opts, bundle) {
            const cacheKey = 'css-in-js-plugin_css'
            for (const key in bundle) {
                if (bundle[key]) {
                    const chunk = bundle[key];
                    if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
                        this.cache.set(cacheKey, (this.cache.get(cacheKey) || '') + chunk.source)
                        delete bundle[key];
                    }
                }
            }
            for (const key in bundle) {
                if (bundle[key]) {
                    const chunk = bundle[key];
                    if (chunk.type === 'chunk' && chunk.fileName.includes('.js')) {
                        //IIFE http://benalman.com/news/2010/11/immediately-invoked-function-expression/
                        chunk.code += `(function(){ try {var elementStyle = document.createElement('style'); elementStyle.innerText = \`${this.cache.get(cacheKey)}\`; document.head.appendChild(elementStyle);} catch(e) {console.error(e, 'vite-plugin-css-injected-by-js: can\\'t add the style.');} })();`;
                        break;
                    }
                }
            }
        },
        transformIndexHtml: {
            enforce: "post",
            transform(html, ctx) {
                if (!ctx || !ctx.bundle)
                    return html;
                for (const [, value] of Object.entries(ctx.bundle)) {
                    if (value.fileName.endsWith('.css')) {
                        // Remove CSS link from HTML generated.
                        const reCSS = new RegExp(`<link rel="stylesheet"[^>]*?href="/${value.fileName}"[^>]*?>`);
                        html = html.replace(reCSS, '');
                    }
                }
                return html;
            },
        },
    };
}