module.exports = {
    title: 'Laravel Excel',
    description: 'Supercharged Excel exports in Laravel',

    head: [
        [
            'link',
            {
                href:
                    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:100,300,400,500,600,700',
                rel: 'stylesheet',
                type: 'text/css',
            },
        ],
    ],

    themeConfig: {
        logo: '/assets/img/logo.png',
        repo: 'maatwebsite/laravel-excel',
        docsRepo: 'maatwebsite/laravel-excel-docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        displayAllHeaders: false,
        sidebarDepth: 0,

        nav: [
            {
                text: 'Version',
                link: '/',
                items: [
                    {text: '3.0', link: '/3.0/'},
                    {text: '2.1', link: '/2.1/'}
                ]
            },
        ],

        sidebar: {
            '/3.0/': require('./3.0'),
            '/2.1/': require('./2.1'),
        },
    },
};
