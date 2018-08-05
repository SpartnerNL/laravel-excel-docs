module.exports = [
    {
        title: 'Getting Started',
        collapsable: false,
        children: prefix('getting-started', [
            '',
            'config',
            'requirements',
            'contributing',
            'license'
        ]),
    },
    {
        title: 'Imports',
        collapsable: false,
        children: prefix('import', [
            '',
            'injection',
            'results',
            'select',
            'dates',
            'calculation',
            'formatting',
            'cache',
            'chunk',
            'batch',
            'config',
            'edit',
            'convert',
            'extra'
        ]),
    },
    {
        title: 'Exports',
        collapsable: false,
        children: prefix('export', [
            '',
            'export',
            'injection',
            'store',
            'sheets',
            'array',
            'rows',
            'cells',
            'sheet-styling',
            'freeze',
            'autofilter',
            'sizing',
            'autosize',
            'merge',
            'format',
            'call'
        ]),
    },
    {
        title: 'Blade to Excel',
        collapsable: false,
        children: prefix('blade', [
            'load-view',
            'vars',
            'styling',
        ]),
    },
    {
        title: 'Reference Guide',
        collapsable: false,
        children: prefix('reference-guide', [
            'file-properties',
            'sheet-properties',
            'css-styles',
            'borders',
            'formatting',
            'closures'
        ]),
    }
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
