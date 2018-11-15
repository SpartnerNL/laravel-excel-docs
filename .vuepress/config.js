module.exports = {
    title: 'Laravel Excel',
    description: 'Supercharged Excel exports and imports in Laravel',
    ga: 'UA-775649-14',
    serviceWorker: true,

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

        serviceWorker: {
            updatePopup: true
        },

        nav: [
            {
                text: 'Version',
                link: '/',
                items: [
                    {text: '3.1', link: '/3.1/'},
                    {text: '3.0', link: '/3.0/'},
                    {text: '2.1', link: '/2.1/'},
                ]
            },
            {
                text: 'Nova',
                link: '/nova/',
                items: [
                    {text: '1.1', link: '/nova/1.1/'},
                    {text: '1.0', link: '/nova/1.0/'},
                ]
            },
            {
                text: 'Blog',
                link: 'https://medium.com/maatwebsite/laravel-excel/home',
            }
            ,
            {
                text: 'Maatwebsite',
                link: 'https://www.maatwebsite.nl',
            }
        ],

        sidebar: {
            '/3.1/': require('./3.1'),
            '/3.0/': require('./3.0'),
            '/2.1/': require('./2.1'),
            '/nova/1.0/': require('./nova/1.0'),
            '/nova/1.1/': require('./nova/1.1'),
        },
    },
};
