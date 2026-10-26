import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue';
import LegacyVersionBanner from './LegacyVersionBanner.vue';
import './custom.css';

export default {
    extends: DefaultTheme,

    Layout: () => h(DefaultTheme.Layout, null, {
        'doc-before': () => h(LegacyVersionBanner),
    }),

    enhanceApp({ app }) {
        app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons);
    },
};
