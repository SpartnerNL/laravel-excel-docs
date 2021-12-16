<template>
  <header class="navbar">
    <div class="navbar-container theme-container">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

      <a
          href="https://laravel-excel.com"
          class="home-link"
      >
        <!--<img-->
            <!--class="logo"-->
            <!--v-if="$site.themeConfig.logo"-->
            <!--:src="$withBase($site.themeConfig.logo)"-->
            <!--:alt="$siteTitle"-->
        <!--&gt;-->
        <span
            ref="siteName"
            class="site-name"
            v-if="$siteTitle"
            :class="{ 'can-hide': $site.themeConfig.logo }"
        >

          <svg height="18" style="height: 18px; fill: currentColor;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 598.34 48.45">
    <defs>
        <clipPath id="a" transform="translate(-43.24 -198.22)">
            <rect x="88.14" y="206.64" width="36.04" height="40.04" fill="none"/>
        </clipPath>
        <clipPath id="b" transform="translate(-43.24 -198.22)">
            <polygon points="116.16 246.36 123.95 243.86 119 228.69 109.39 225.72 116.16 246.36" fill="none"/>
        </clipPath>
        <clipPath id="c" transform="translate(-43.24 -198.22)">
            <polygon points="97.9 214.56 104.35 221.19 109.06 206.73 100.4 206.73 97.9 214.56" fill="none"/>
        </clipPath>
    </defs>
    <path d="M43.24,206H51.7v33H68.84v7H43.24Z" transform="translate(-43.24 -198.22)"/>
    <path d="M141.21,206H157c9.08,0,14.33,5.12,14.33,13.07,0,5.47-2.52,9.43-7.07,11.39l8.5,15.54h-9.34l-7.57-14.18h-6.18V246h-8.45Zm14.2,19c4.84,0,7.2-2,7.2-6s-2.36-6.15-7.24-6.15h-5.71v12.11Z"
          transform="translate(-43.24 -198.22)"/>
    <path d="M188.88,246l13.81-40h10.9l13.79,40h-9.06l-3-9.12H200.91L198,246Zm24.34-15.72-4.92-15.14H208l-4.92,15.14Z" transform="translate(-43.24 -198.22)"/>
    <path d="M257.87,236.41h.37L267.93,206h9.37l-13.79,40h-10.9L238.8,206h9.4Z" transform="translate(-43.24 -198.22)"/>
    <path d="M295.86,206h26.95v7h-18.5v9.53h17.11v7H304.31v9.55h18.58v7h-27Z" transform="translate(-43.24 -198.22)"/>
    <path d="M343.3,206h8.45v33H368.9v7H343.3Z" transform="translate(-43.24 -198.22)"/>
    <path d="M414.76,206h26.95v7H423.22v9.53h17.11v7H423.22v9.55h18.57v7h-27Z" transform="translate(-43.24 -198.22)"/>
    <path d="M478.2,219.66h.31L486.62,206h9.55L484,226l12.48,20h-9.73l-8.2-13.65h-.31L470,246h-9.69l12.52-20-12.29-20h9.59Z" transform="translate(-43.24 -198.22)"/>
    <path d="M540.15,220c-.64-4.4-4-7.07-8.61-7.07-6.19,0-10.25,4.74-10.25,13.06,0,8.56,4.12,13.07,10.19,13.07,4.51,0,7.87-2.46,8.67-6.74l8.56,0c-.92,7.36-7.11,14.18-17.37,14.18-10.7,0-18.63-7.5-18.63-20.55s8.07-20.54,18.63-20.54c9.26,0,16.25,5.31,17.37,14.55Z"
          transform="translate(-43.24 -198.22)"/>
    <path d="M568.53,206h27v7H577v9.53H594.1v7H577v9.55h18.57v7h-27Z" transform="translate(-43.24 -198.22)"/>
    <path d="M616,206h8.46v33h17.15v7H616Z" transform="translate(-43.24 -198.22)"/>
    <g clip-path="url(#a)">
        <rect x="44.91" y="8.42" width="36.01" height="40.03" fill="none"/>
        <path d="M116.16,246.36l7.79-2.5-12.13-37.13h-8.66Z" transform="translate(-43.24 -198.22)" fill="#f59a02" fill-rule="evenodd"/>
        <g clip-path="url(#b)">
            <image width="36" height="51" transform="translate(66.15 27.5) scale(0.4 0.4)"
                   xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAzCAYAAAD/06q7AAAACXBIWXMAABtfAAAbXwFfNGm4AAADCElEQVRYR9VYS47UMBB95UkkNlwBDoLmHJyADVtWLLgB3APOAAsQzEG4AjNj93RiF4uynUo6nR9JunlS1JI77by8V/XKavrz6+MtVsbzV+9+jt1zDgZcAeCx+2bh/u7T4pc05C3gHcBHrE1sCQyCAwUL8k6IhXWILVVJFAoOCFaIBQt4G4mFsd8PYgmpAsGCuASoBFMFmBJENUAVwCWYSoAKgMzYXqvAiE1JIQepqR7VwhPAfmy/E8xVyUj9xMIOQqS15tOaXEuIzSFVIDiAalC2qBaLTFyjEszyCVOAKNlbyBrdjD1jFsxZi5RqWZ3UiT6tWSAcJik2VSWT7fCx9YNTFinbvK4nlwmTt4pYPfiwKaQK8hZsyih/FTuukO5qWSSWgmqQiVYmeznaa7SVxdizeyEK+VjEQRe2U2GpLWpUa9RJ66Jy3qtHsTGV5DW4lrfkqlHDyFsSlbHY5bukjlaNqAZMERWL96W9TMqxcohHRjvtuIauqZOMyur0qWaV0qpJUm16Cxnkwyr1xy/XQDicySOriMXCjuRyQ+RiPxO6fMT9Xf+xZ7jy2APsVR7FIm4Vdir2CmRUQ1AJcCWWG2W5zrseTBtQ7BvFlEXtPGpyirxaC6kBVLHHfR5+fDhRaRqhBPZAeGqCsjePXO7Eky7MHd3Y+/D9fYvUsrBoWTlskWSU2My5Qzt5pzBPoS44AOGYLdKqNRY1V+7C1iB3ePz2Nqv0b4QyhFgzXtQDOxblTlXxgeDw+PXNLbDUsrNgIYZkXRXt7I6kuNYJXQAg9/nF6MBbDpKYMPrk2Xy2UjySXVmhLljS2Uc1qBgY5JJRGxNS4Eq6kGXeCTEJWqIa4GoPhXqQiaWkL1qDfH9CCemEEc9THI/NlyOUkIndyFGGmXH48nLDTpsHAwDPXv9e/G/F2lgpqddDJnQtKrUUugZS12tZwqVV6lXokqSu37KES6k0qNAlSP0/liXsrdIoob0xidCeKk0iBOxHajKhvTCL0B4qzSIEbE9qNqGtsYjQliotIgRsR+ovyga1ZHLYZSIAAAAASUVORK5CYII="
                   style="isolation:isolate"/>
        </g>
        <path d="M88.48,244l7.81,2.51,12.77-39.81H100.4Z" transform="translate(-43.24 -198.22)" fill="#f59a02" fill-rule="evenodd"/>
        <path d="M91.84,245.11l4.45,1.43,12.77-39.81H104Z" transform="translate(-43.24 -198.22)" fill="#f69e0b" fill-rule="evenodd"/>
        <path d="M88.48,244l7.81,2.51-5.93-8.39Z" transform="translate(-43.24 -198.22)" fill="#f4a536" fill-rule="evenodd"/>
        <g clip-path="url(#c)">
            <image width="28" height="36" transform="translate(54.66 8.5) scale(0.4 0.4)"
                   xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAlCAYAAABReInxAAAACXBIWXMAABvVAAAb1QEhcy7HAAABvElEQVRYR91WS27EMAiFyGeaG/eIXbUTujBgwDi4UjRV50mRsQ08PnYS/Px4EFyi2AYs9j1a7fBeHJXC3djI8Hclq/AHGWJ1Zv55hi8nbIRfLHLptIR9RDyT9VWZcR7x22mYDGkxMlyvo7ywAeqBmqdheS0E2EmjuiSzdOOrsXEPBQSd1EwtlsT+mDQE7lHaFwKa1oWYgo0NiGUSeSBkGJ0Al3F1SBJ9CwQAOsHCExJCWis5MMRz1cn0A8KLpY34iO3FCfKqca6HxjQMea5+xTYPpBE8WWQniENWCd3MjupWib1O7MYB6l9MCebozN6lrp2zTOCe0UOt0k5fWIeGGW+AtzX9Z8z38PJUCrhPk5r0z8yDrwZwwmTpysZ7FJ1ZJETS/WDSRoGLrLTkYASsrHqcBk3fGHFnBW1T0usNF60P1HPXstmMQ2mdrs1R1sHYzUG1wynYUWaHSg7Mc+o+L2jThHw6NBWqOsWqZOPABuEOkqAWcW4QXmeI2bUyiFd6g7ACwVxGmdrD17FBWGWYgTS1aL1BWCELKLmjjJqwfJVYARfyQEmI5Yt8sc9fifin/fI/7/cnRNr9StyEHyt5rS+7DNahAAAAAElFTkSuQmCC"
                   style="isolation:isolate"/>
        </g>
    </g>
    <path d="M97.81,205.68c.62-1.69.81-2.8,1-3.28s1-2.2,4.11-2.81c2.21-1,5.44-2,8-.86a7.63,7.63,0,0,1,3.94,3.9c.77,1.39,1.84,3.8,3.59,9.61l-1,1.65L114,211l-12.2-.75-4.73.27-.69-.76Z"
          transform="translate(-43.24 -198.22)" fill="#ed2e26"/>
    <path d="M111.72,201a4.77,4.77,0,0,1,1.14,3c.14,1.74,0,2.26,1.3,3.85a4.76,4.76,0,0,1,1.16,2.7A11.75,11.75,0,0,0,116.4,213l-.57,0-1.67-1.44s-1.07-3.39-1.11-3.54-1.34-3.25-1.34-3.25S112.35,204.06,111.72,201Z"
          transform="translate(-43.24 -198.22)" fill="#d52922"/>
    <path d="M97.81,205.68c.62-1.69.81-2.8,1-3.28s1-2.2,4.11-2.81l.18-.09a4.66,4.66,0,0,0-1.47,1.89c-.22.57-.44,1.9-1.19,3.91-.51,1.38-1.41,3.75-1.93,5.1l-1.48.08-.69-.76Z"
          transform="translate(-43.24 -198.22)" fill="#d52922"/>
    <path d="M110.66,202.3a8.46,8.46,0,0,0-2-2.29,4.27,4.27,0,0,0-2.69-.52A7.93,7.93,0,0,1,110.66,202.3Z" transform="translate(-43.24 -198.22)" fill="#bc241e"/>
    <path d="M107.82,202.12s3.14,2.41,3.81,2.28-.07-3.68-.07-3.68l0,0a4.63,4.63,0,0,1,.67,3.83,1.45,1.45,0,0,0,.08.94c.27.59.72,1.57,1.1,2.25a7.75,7.75,0,0,1,.76,1.93l-1.3-.73a9.4,9.4,0,0,0-.52-2.37,5.74,5.74,0,0,0-2.14-2.36h0A11.41,11.41,0,0,1,107.82,202.12Z"
          transform="translate(-43.24 -198.22)" fill="#bc241e"/>
    <circle cx="74.83" cy="15.63" r="2.68" fill="#fff"/>
    <path d="M119.09,211.38a2.67,2.67,0,0,1-1.94,4.34,2.79,2.79,0,0,1-1.19-.2,2.68,2.68,0,1,0,3.13-4.14Z" transform="translate(-43.24 -198.22)" fill="#cce8eb"/>
    <path d="M115.51,211.63a6.72,6.72,0,0,1-.43-1.16,2.33,2.33,0,0,0-.43-1.12c-.88-1-2.68-1.35-4-1.54a28.18,28.18,0,0,0-5.66-.15,26.06,26.06,0,0,0-5.05.73c-1.39.35-3.49.78-4.34,2.05a2.48,2.48,0,0,0-.3,1.17,6.18,6.18,0,0,1-.29,1.2c-.15.58-.57,2.72,1,3,0,0-.71-1.06,1.36-1.73a24.76,24.76,0,0,1,7.88-1.47,24.85,24.85,0,0,1,8,.55c2.14.43,1.55,1.57,1.55,1.57C116.39,214.27,115.73,212.19,115.51,211.63Z"
          transform="translate(-43.24 -198.22)" fill="#fff"/>
    <path d="M115.51,211.63a6.72,6.72,0,0,1-.43-1.16,2.33,2.33,0,0,0-.43-1.12,4.64,4.64,0,0,0-2.5-1.27,3.72,3.72,0,0,1,.91.8c0,.07.38.72.06,1.07s-3.85-1-8.8.06c0,0,7-.27,8.68.93.26.2.76.73,0,1.26-1,.67-8.59-3.32-16.32,2.2a4.12,4.12,0,0,1,.77-.33,24.76,24.76,0,0,1,7.88-1.47,24.85,24.85,0,0,1,8,.55c2.14.43,1.55,1.57,1.55,1.57C116.39,214.27,115.73,212.19,115.51,211.63Z"
          transform="translate(-43.24 -198.22)" fill="#cce8eb"/>
    <path d="M97.33,211.31a.69.69,0,0,1-.35,0,.46.46,0,0,1-.36-.44c0-.42.43-.79.56-.89a17.48,17.48,0,0,1,3.79-1.8c-.34.07-.68.14-1,.23-1.47.37-3.74.83-4.47,2.29a1.71,1.71,0,0,0-.16.71,5.87,5.87,0,0,1-.29,1.42,4,4,0,0,0-.15.79h0A3.64,3.64,0,0,1,96.7,212a17.76,17.76,0,0,1,2.78-.91A11.86,11.86,0,0,0,97.33,211.31Z"
          transform="translate(-43.24 -198.22)" fill="#cce8eb"/>
</svg>


        </span>
      </a>

      <div
          class="links"
          :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
      >
        <AlgoliaSearchBox
            v-if="isAlgoliaSearch"
            :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false"/>
        <NavLinks class="can-hide"/>
      </div>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar-container
  display flex
  justify-content space-between

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
    margin-top 5px
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
</style>
