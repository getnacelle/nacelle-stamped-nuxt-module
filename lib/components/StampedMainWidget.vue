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
    productUrl() {
      return `${this.domain}/products/${this.product.handle}`
    },
    decodedProductId() {
      if (this.product && this.product.id) {
        const decodedIdUri = window.atob(this.product.id)
        const decodedIdParts = decodedIdUri.split('Product/')
        const decodedId = decodedIdParts[1]
        return decodedId
      }

      return ''
    }
  }
}
</script>

<style>
</style>
