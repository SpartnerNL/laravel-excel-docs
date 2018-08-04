module.exports = {
  title: 'Laravel Excel',
  description: 'Laravel Flavoured PhpSpreadsheets',

  themeConfig: {
    logo: 'https://laravel-excel.maatwebsite.nl/img/logo-small.png',
    repo: 'maatwebsite/laravel-excel',
    displayAllHeaders: true,
    sidebarDepth: 1,

    nav: [
      {text: 'Home', link: 'https://laravel-excel.maatwebsite.nl'},
      {text: 'Version', link: '/', items: [{text: '3.0', link: '/3.0/'}]},
    ],

    sidebar: {
      '/3.0/': require('./3.0'),
    },
  },
};
