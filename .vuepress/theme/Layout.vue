<template>
    <div
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <Navbar
            v-if="shouldShowNavbar"
            @toggle-sidebar="toggleSidebar"
        />

        <div
            class="sidebar-mask"
            @click="toggleSidebar(false)"
        ></div>

        <Sidebar
            :items="sidebarItems"
            @toggle-sidebar="toggleSidebar"
        >
            <slot
                name="sidebar-top"
                slot="top"
            />
            <slot
                name="sidebar-bottom"
                slot="bottom"
            />
        </Sidebar>

        <div
            class="custom-layout"
            v-if="$page.frontmatter.layout"
        >
            <component :is="$page.frontmatter.layout"/>
        </div>

        <Home v-else-if="$page.frontmatter.home"/>

        <Page
            v-else
            :sidebar-items="sidebarItems"
        >
            <slot
                name="page-top"
                slot="top"
            />
            <slot
                name="page-bottom"
                slot="bottom"
            />
        </Page>

        <SWUpdatePopup :updateEvent="swUpdateEvent"/>
    </div>
</template>

<script>
    import Layout from "vuepress/lib/default-theme/Layout";
    import Navbar from "./Navbar";

    export default {
        components: {Navbar},
        mixins: [Layout],
    }
</script>

<!--<style src="prismjs/themes/prism-tomorrow.css"></style>-->
<!--<style src="./styles/theme.styl" lang="stylus"></style>-->
