import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vitepress';
import container from 'markdown-it-container';
import codeTheme from './code-theme.mjs';
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms';
import sidebar4x from './sidebar/4.x.mjs';
import sidebar31 from './sidebar/3.1.mjs';
import sidebar30 from './sidebar/3.0.mjs';
import sidebar21 from './sidebar/2.1.mjs';
import sidebarNova1x from './sidebar/nova-1.x.mjs';

const hostname = 'https://docs.laravel-excel.com';
const description = 'Supercharged Excel exports and imports in Laravel';

// Older versions keep their per-page Markdown, but stay out of llms.txt / llms-full.txt and search.
const legacyVersions = ['2.1/**', '3.0/**', '3.1/**', 'csv/**'];

export default defineConfig({
    title: 'Laravel Excel',
    description,
    lang: 'en-US',

    srcExclude: ['README.md'],
    lastUpdated: true,

    sitemap: {
        hostname,
    },

    head: [
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['link', { rel: 'icon', href: '/icon.png' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Laravel Excel' }],
        ['meta', { property: 'og:image', content: `${hostname}/android-chrome-512x512.png` }],
        ['meta', { name: 'twitter:card', content: 'summary' }],
    ],

    // Canonical URL and share previews per page.
    transformHead({ pageData }) {
        const url = `${hostname}/${pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')}`;
        const title = pageData.title ? `${pageData.title} | Laravel Excel` : 'Laravel Excel';

        return [
            ['link', { rel: 'canonical', href: url }],
            ['meta', { property: 'og:url', content: url }],
            ['meta', { property: 'og:title', content: title }],
            ['meta', { property: 'og:description', content: pageData.description || description }],
        ];
    },

    vite: {
        plugins: [
            // llms.txt, llms-full.txt and a .md version of every page, for LLMs and AI tools.
            llmstxt({
                domain: hostname,
                description,
                ignoreFiles: ['README.md'],
                ignoreFilesPerOutput: {
                    llmsTxt: legacyVersions,
                    llmsFullTxt: legacyVersions,
                },
                sidebar: (sidebar) => ({
                    '/4.x/': sidebar['/4.x/'],
                    '/nova/1.x/': sidebar['/nova/1.x/'],
                }),
            }),
        ],
    },

    markdown: {
        lineNumbers: true,
        // Dark code blocks in both modes, in the Laravel Excel palette.
        theme: {
            light: codeTheme,
            dark: codeTheme,
        },
        config(md) {
            // File trees: `::: vue` blocks render as a preformatted block, with inline code highlighted.
            md.use(container, 'vue', {
                render: (tokens, idx) => tokens[idx].nesting === 1
                    ? '<pre class="vue-container"><code>'
                    : '</code></pre>\n',
            });

            // "Copy page" button with "View as Markdown" and "Open in ChatGPT/Claude".
            md.use(copyOrDownloadAsMarkdownButtons);
        },
    },

    // The old theme showed a page's [[toc]] as the right-hand table of contents, and nothing
    // there when a page had none. The outline does that job now; the inline [[toc]] is hidden.
    transformPageData(pageData, { siteConfig }) {
        const source = readFileSync(join(siteConfig.srcDir, pageData.relativePath), 'utf8');

        if (!source.includes('[[toc]]')) {
            pageData.frontmatter.outline ??= false;
        }
    },

    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo-dark.svg',
            alt: 'Laravel Excel',
        },
        siteTitle: false,
        logoLink: 'https://laravel-excel.com',

        nav: [
            {
                component: 'VersionSwitcher',
                props: {
                    versions: [
                        {
                            items: [
                                { text: 'Laravel Excel 4.x', label: 'v4.x', prefix: '/4.x/', link: '/4.x/getting-started/' },
                                { text: 'Laravel Excel 3.1', label: 'v3.1', prefix: '/3.1/', link: '/3.1/getting-started/' },
                                { text: 'Laravel Excel 3.0', label: 'v3.0', prefix: '/3.0/', link: '/3.0/getting-started/' },
                                { text: 'Laravel Excel 2.1', label: 'v2.1', prefix: '/2.1/', link: '/2.1/getting-started/' },
                            ],
                        },
                        {
                            items: [
                                { text: 'Laravel Nova Excel 1.x', label: 'Nova 1.x', prefix: '/nova/1.x/', link: '/nova/1.x/getting-started/' },
                            ],
                        },
                    ],
                },
            },
            { text: 'Commercial Support', link: 'https://laravel-excel.com/commercial-support' },
            { text: 'Blog', link: 'https://medium.com/spartner/laravel-excel/home' },
            { text: 'GitHub', link: 'https://github.com/SpartnerNL/Laravel-Excel' },
        ],

        sidebar: {
            '/4.x/': sidebar4x,
            '/3.1/': sidebar31,
            '/3.0/': sidebar30,
            '/2.1/': sidebar21,
            '/nova/1.x/': sidebarNova1x,
        },

        outline: {
            level: [2, 3],
            label: 'On this page',
        },

        editLink: {
            pattern: 'https://github.com/SpartnerNL/laravel-excel-docs/edit/master/:path',
            text: 'Help us improve this page!',
        },

        search: {
            provider: 'local',
            options: {
                // Only the current versions are searchable, like the old Algolia index.
                _render(src, env, md) {
                    if (!/^(4\.x|nova\/1\.x)\//.test(env.relativePath)) {
                        return '';
                    }

                    return md.render(src, env);
                },
            },
        },
    },
});
