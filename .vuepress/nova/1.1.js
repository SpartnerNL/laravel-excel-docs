module.exports = [
    {
        title: 'Getting Started',
        collapsable: false,
        children: prefix('getting-started', [
            '',
            'installation'
        ]),
    },
    {
        title: 'Exports',
        collapsable: false,
        children: prefix('exports', [
            '',
            'download',
            'store',
            'queued',
            'customizations',
            'interactions'
        ]),
    },
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
