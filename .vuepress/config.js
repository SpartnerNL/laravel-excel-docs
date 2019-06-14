module.exports = {
    title: 'Laravel Excel',
    description: 'Supercharged Excel exports and imports in Laravel',

    plugins: {
        '@vuepress/google-analytics': {
            ga: 'UA-775649-14'
        },
        '@vuepress/pwa': {
            serviceWorker: true,
            updatePopup: true
        },
        'sitemap': {
            hostname: 'https://docs.laravel-excel.com'
        },
    },

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
            algoliaOptions: { 'facetFilters': ["version:3.1"] },
        },

        nav: [
            {
                text: 'Version',
                link: '/',
                items: [
                    {text: 'LE 3.1', link: '/3.1/'},
                    {text: 'LE 3.0', link: '/3.0/'},
                    {text: 'LE 2.1', link: '/2.1/', divider: true},
                    {text: 'Csv 1.0', link: '/csv/1.0/', divider: true},
                    {text: 'Nova 1.1', link: '/nova/1.1/'},
                    {text: 'Nova 1.0', link: '/nova/1.0/'},
                ]
            },
        ],

        sidebar: {
            '/3.1/': require('./3.1'),
            '/3.0/': require('./3.0'),
            '/2.1/': require('./2.1'),
            '/nova/1.0/': require('./nova/1.0'),
            '/nova/1.1/': require('./nova/1.1'),
            '/csv/1.0/': require('./csv/1.0'),
        },
    },
};
