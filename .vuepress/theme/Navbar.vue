<template>
    <header class="navbar">
        <div class="navbar-container">
            <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

            <router-link
                :to="$localePath"
                class="home-link"
            >
                <img
                    class="logo"
                    v-if="$site.themeConfig.logo"
                    :src="$withBase($site.themeConfig.logo)"
                    :alt="$siteTitle"
                >
                <span
                    ref="siteName"
                    class="site-name"
                    v-if="$siteTitle"
                    :class="{ 'can-hide': $site.themeConfig.logo }"
                >{{ $siteTitle }}</span>
            </router-link>

            <AlgoliaSearchBox
                v-if="isAlgoliaSearch"
                :options="algolia"
            />
            <SearchBox v-else-if="$site.themeConfig.search !== false"/>

            <div
                class="links"
                :style="{
        'max-width': linksWrapMaxWidth + 'px'
      }"
            >
                <NavLinks class="can-hide"/>
            </div>
        </div>
    </header>
</template>

<script>
    import Navbar from "vuepress/lib/default-theme/Navbar";

    export default {
        mixins: [Navbar],
    }

</script>
