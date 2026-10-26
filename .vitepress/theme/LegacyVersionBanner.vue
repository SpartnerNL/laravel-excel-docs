<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();

const versions = {
    '/3.1/': 'Laravel Excel 3.1',
    '/3.0/': 'Laravel Excel 3.0',
    '/2.1/': 'Laravel Excel 2.1',
    '/csv/1.0/': 'Laravel Excel CSV 1.0',
};

const version = computed(() => Object.entries(versions).find(([prefix]) => route.path.startsWith(prefix))?.[1]);
</script>

<template>
    <div v-if="version" class="legacy-version-banner">
        You're reading the docs for <strong>{{ version }}</strong>.
        The current version is <a href="/4.x/getting-started/">Laravel Excel 4.x</a>
        (<a href="/4.x/getting-started/upgrade.html">upgrade guide</a>).
    </div>
</template>

<style scoped>
.legacy-version-banner {
    margin-bottom: 24px;
    padding: 12px 16px;
    border-left: 0.5rem solid var(--le-orange);
    background-color: var(--vp-c-brand-soft);
    font-size: 14px;
    line-height: 1.6;
    color: var(--vp-c-text-1);
}

.legacy-version-banner a {
    font-weight: 600;
    color: var(--vp-c-brand-1);
}
</style>
