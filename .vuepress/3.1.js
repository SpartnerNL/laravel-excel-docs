module.exports = [
    {
        title: 'Getting Started',
        collapsable: false,
        children: prefix('getting-started', [
            '',
            'license',
            'installation',
            'upgrade',
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
            'export-formats',
            'exportables',
            'from-query',
            'from-view',
            'queued',
            'multiple-sheets',
            'mapping',
            'column-formatting',
            'concerns',
            'extending',
            'testing',
        ]),
    },
    {
        title: 'Imports',
        collapsable: false,
        children: prefix('imports', [
            '',
            'basics',
            'collection',
            'model',
            'importables',
            'heading-row',
            'batch-inserts',
            'chunk-reading',
            'queued',
            'mapped-cells',
            'concerns',
            'extending',
            'testing',
        ]),
    },
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
