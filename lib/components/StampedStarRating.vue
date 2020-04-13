<template>
  <div>
    <client-only>
      <span
        class="stamped-product-reviews-badge stamped-main-badge"
        :data-id="decodedProductId"
        :data-product-sku="product.handle"
        :data-product-title="product.title"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          pimSyncSourceProductId: '',
          handle: ''
        }
      }
    }
  },
  computed: {
    decodedProductId () {
      if (this.product && this.product.pimSyncSourceProductId) {
        const decodedIdUri = window.atob(this.product.pimSyncSourceProductId)
        const decodedIdParts = decodedIdUri.split('Product/')
        const decodedId = decodedIdParts[1]
        return decodedId
      }

      return ''
    }
  },
  mounted () {
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
    } else if (window.StampedFn && !window.stampedBadgesLoaded) {
      setTimeout(() => {
        window.StampedFn.loadBadges()
      }, 200)
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

<style>

</style>
