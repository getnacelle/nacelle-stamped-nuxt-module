<template>
  <div>
    <client-only>
      <div
        id="stamped-main-widget"
        data-widget-style="standard"
        :data-product-id="decodedProductId"
        :data-name="product.title"
        :data-url="product.url"
        :data-image-url="product.featuredMedia.src"
        :data-description="product.description"
        :data-product-sku="product.handle"
      />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          id: '',
          handle: '',
          title: '',
          description: '',
          featuredMedia: {
            type: 'image',
            src: ''
          }
        }
      }
    }
  },
  computed: {
    ...mapState('space', ['domain']),
    productUrl () {
      return `${this.domain}/products/${this.product.handle}`
    },
    decodedProductId () {
      if (this.product && this.product.id) {
        const decodedIdUri = window.atob(this.product.id)
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
    } else if (window.StampedFn) {
      window.StampedFn.init()
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
