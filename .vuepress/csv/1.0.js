module.exports = [
    {
        title: 'Getting Started',
        collapsable: false,
        children: prefix('getting-started', [
            '',
            'license',
            'installation',
            'contributing',
            'support',
        ]),
    },
    {
        title: 'Exports',
        collapsable: false,
        children: prefix('exports', [
            '',
            'collection',
            'store',
            'exportables',
            'from-query',
            'queued',
            'mapping',
            'configuration',
            'concerns',
        ]),
    },
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
