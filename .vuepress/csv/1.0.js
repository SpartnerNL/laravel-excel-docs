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
        ]),
    },
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
