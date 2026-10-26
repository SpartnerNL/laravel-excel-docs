// Syntax highlighting in the Laravel Excel palette: orange keywords, spreadsheet-green
// strings, teal types and blue calls on graphite. Used for code blocks in light and dark mode.

const colors = {
    background: '#1f2329',
    foreground: '#e3e6ea',
    muted: '#9aa3ad',
    comment: '#6f7884',
    orange: '#f5a823',
    green: '#9fd18b',
    teal: '#6fd3c7',
    blue: '#86b6f6',
    salmon: '#f2a68e',
    violet: '#c6a8f5',
};

export default {
    name: 'laravel-excel',
    type: 'dark',
    colors: {
        'editor.background': colors.background,
        'editor.foreground': colors.foreground,
    },
    tokenColors: [
        {
            settings: { foreground: colors.foreground },
        },
        {
            scope: ['comment', 'punctuation.definition.comment', 'comment.block.documentation', 'keyword.other.phpdoc'],
            settings: { foreground: colors.comment, fontStyle: 'italic' },
        },
        {
            scope: [
                'keyword',
                'keyword.control',
                'keyword.other.use',
                'keyword.other.new',
                'keyword.other.namespace',
                'storage.type',
                'storage.modifier',
                'storage.type.function',
                'storage.type.class',
                'keyword.operator.new',
                'keyword.operator.expression',
                'keyword.operator.logical.php',
                'variable.language.this',
                'support.function.construct',
            ],
            settings: { foreground: colors.orange },
        },
        {
            scope: ['string', 'string.quoted', 'punctuation.definition.string', 'string.unquoted', 'string.template'],
            settings: { foreground: colors.green },
        },
        {
            scope: [
                'entity.name.type',
                'entity.name.class',
                'entity.other.inherited-class',
                'support.class',
                'support.type',
                'entity.name.namespace',
                'support.other.namespace',
                'storage.type.php',
                'meta.other.type',
            ],
            settings: { foreground: colors.teal },
        },
        {
            scope: ['entity.name.function', 'support.function', 'meta.function-call', 'variable.function'],
            settings: { foreground: colors.blue },
        },
        {
            scope: ['variable', 'variable.other', 'variable.parameter', 'punctuation.definition.variable'],
            settings: { foreground: colors.salmon },
        },
        {
            scope: ['variable.other.property', 'variable.other.object.property', 'meta.property-name', 'support.type.property-name'],
            settings: { foreground: colors.foreground },
        },
        {
            scope: ['constant', 'constant.numeric', 'constant.language', 'constant.other', 'support.constant'],
            settings: { foreground: colors.violet },
        },
        {
            scope: ['entity.name.tag', 'punctuation.definition.tag'],
            settings: { foreground: colors.orange },
        },
        {
            scope: ['entity.other.attribute-name'],
            settings: { foreground: colors.blue },
        },
        {
            scope: ['punctuation', 'keyword.operator', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'],
            settings: { foreground: colors.muted },
        },
        {
            scope: ['markup.heading', 'markup.bold'],
            settings: { foreground: colors.orange, fontStyle: 'bold' },
        },
        {
            scope: ['markup.italic'],
            settings: { fontStyle: 'italic' },
        },
        {
            scope: ['markup.inserted'],
            settings: { foreground: colors.green },
        },
        {
            scope: ['markup.deleted'],
            settings: { foreground: colors.salmon },
        },
    ],
};
