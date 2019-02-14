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
        title: 'Architecture Concepts',
        collapsable: true,
        children: prefix('architecture', [
            '',
            'objects',
            'concerns',
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
            'custom-formatting-values',
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
            'import-formats',
            'multiple-sheets',
            'heading-row',
            'batch-inserts',
            'chunk-reading',
            'queued',
            'validation',
            'mapped-cells',
            'custom-csv-settings',
            'progress-bar',
            'concerns',
            'extending',
            'testing',
        ]),
    },
];

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
