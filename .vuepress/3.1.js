module.exports = [
    {
        title: 'Getting Started',
        collapsable: true,
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
        collapsable: true,
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
        collapsable: true,
        children: prefix('imports', [
            '',
            'basics',
            'collection',
            'model',
            'importables',
            'multiple-sheets',
            'heading-row',
            'batch-inserts',
            'chunk-reading',
            'queued',
            'mapped-cells',
            'custom-formatting-values',
            'custom-csv-settings',
            'concerns',
            'extending',
            'testing',
        ]),
    },
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
