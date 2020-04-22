<template>
  <div>
    <client-only>
      <div
        id="stamped-reviews-widget"
        :data-color-outer="colorOuter"
        :data-color-inner="colorInner"
        :data-color-ribbon="colorRibbon"
        :data-widget-type="widgetStyle"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    widgetStyle: {
      type: String,
      default: 'carousel'
    },
    colorOuter: {
      type: String,
      default: ''
    },
    colorInner: {
      type: String,
      default: ''
    },
    colorRibbon: {
      type: String,
      default: ''
    }
  },
  mounted() {
    window.stampedLoaded = window.stampedLoaded || false

    if (!window.stampedLoaded) {
      // spoof Shopify global var
      window.Shopify = {}
      window.Shopify.shop = this.$nacelle.stamped.domain

      // load Stamped script
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://cdn-stamped-io.azureedge.net/files/widget.min.js'
      s.setAttribute('data-api-key', this.$nacelle.stamped.apiKey)
      document.body.appendChild(s)

      window.stampedLoaded = true
    } else if (window.StampedFn) {
      setTimeout(() => {
        window.StampedFn.loadDisplayWidgets()
      }, 100)
    } else {
      const waiting = setInterval(() => {
        if (window.StampedFn) {
          clearInterval(waiting)
        }
      }, 100)
    }
  }
}
</script>

