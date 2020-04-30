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
  }
}
</script>

<style>

</style>
