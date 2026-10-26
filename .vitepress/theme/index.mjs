import DefaultTheme from 'vitepress/theme-without-fonts';
import { h } from 'vue';
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue';
import GradientGlow from './GradientGlow.vue';
import LegacyVersionBanner from './LegacyVersionBanner.vue';
import VersionSwitcher from './VersionSwitcher.vue';
import '@fontsource-variable/ibm-plex-sans/wght.css';
import '@fontsource-variable/ibm-plex-sans/wght-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/400-italic.css';
import '@fontsource/ibm-plex-mono/500.css';
import './custom.css';

export default {
    extends: DefaultTheme,

    Layout: () => h(DefaultTheme.Layout, null, {
        'layout-top': () => h(GradientGlow),
        'doc-before': () => h(LegacyVersionBanner),
    }),

    enhanceApp({ app }) {
        app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons);
        app.component('VersionSwitcher', VersionSwitcher);
    },
};
