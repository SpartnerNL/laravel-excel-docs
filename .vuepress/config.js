module.exports = {
    title: 'Laravel Excel',
    description: 'Supercharged Excel exports and imports in Laravel',

    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        ['@vuepress/google-analytics', {
            ga: 'UA-775649-14'
        }],
        ['container', {
            type: 'vue',
            before: '<pre class="vue-container"><code>',
            after: '</code></pre>',
        }],
        ['sitemap', {
            hostname: 'https://docs.laravel-excel.com',
        }],
    ],

    markdown: {
        lineNumbers: true,
    },

    head: [
        [
            'link',
            {
                href: 'https://fonts.googleapis.com/css?family=Nunito:100,300,400,500,600,700',
                rel: 'stylesheet',
                type: 'text/css',
            },
        ],
        [
            "link",
            {
                rel: 'manifest',
                href: '/manifest.json'
            }
        ],
        [
            "link",
            {
                rel: 'icon',
                href: '/icon.png'
            }
        ]
    ],

    themeConfig: {
        logo: '/assets/img/logo-small.png',
        repo: 'maatwebsite/Laravel-Excel',
        docsRepo: 'maatwebsite/laravel-excel-docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        displayAllHeaders: false,
        sidebarDepth: 0,
        algolia: {
            apiKey: 'e95794f59bac5401e3930f71feb3a8e2',
            indexName: 'laravel_excel',
            algoliaOptions: {'facetFilters': ["version:3.1"]},
        },

        nav: [
            {
                text: 'Version',
                link: '/',
                items: [
                    // {text: 'LE 4.x', link: '/4.x/'},
                    {text: 'LE 3.1', link: '/3.1/'},
                    {text: 'LE 3.0', link: '/3.0/'},
                    {text: 'LE 2.1', link: '/2.1/', divider: true},
                    //{text: 'CSV 1.0', link: '/csv/1.0/', divider: true},
                    {text: 'Nova 1.x', link: '/nova/1.x/'},
                ]
            },
        ],

        sidebar: {
            // '/4.x/': require('./4.x'),
            '/3.1/': require('./3.1'),
            '/3.0/': require('./3.0'),
            '/2.1/': require('./2.1'),
            '/nova/1.x/': require('./nova/1.x'),
            //'/csv/1.0/': require('./csv/1.0'),
        },
    },
};
