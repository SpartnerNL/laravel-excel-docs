<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue';
import VPNavScreenMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue';

// Nav dropdown that is labelled with the version you are reading.
const props = defineProps({
    versions: { type: Array, required: true },
    screenMenu: { type: Boolean, default: false },
});

const route = useRoute();

const links = computed(() => props.versions.flatMap((group) => group.items));

const current = computed(() => links.value.find((version) => route.path.startsWith(version.prefix)));

const text = computed(() => (current.value ? current.value.label : 'Version'));

const items = computed(() => props.versions.map((group) => ({
    items: group.items.map(({ text, link }) => ({ text, link })),
})));
</script>

<template>
    <VPNavScreenMenuGroup v-if="screenMenu" :text="text" :items="items" />
    <VPNavBarMenuGroup v-else :item="{ text, items, activeMatch: current ? current.prefix : undefined }" />
</template>
