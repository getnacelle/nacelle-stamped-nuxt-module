<template>
  <div class="product columns">
    <div class="column is-6">
      <product-media-select-view :featured-media="product.featuredMedia" :media="product.media" />
    </div>
    <div class="column is-5 is-offset-1">
      <product-title :title="product.title" />
      <!-- <product-add-to-cart-button
        :product="product"
        :variant="currentVariant"
        :allOptionsSelected="true"
        :onlyOneOption="true"
        :metafields="[{key:'test', value:'hi'}]"
      />-->
      <product-category v-if="product.productType" :category="product.productType" />
      <p class="price">
        <product-price v-if="currentVariant" :price="currentVariant.price" />
      </p>
      <p>
        <stamped-star-rating :product="product" />
      </p>

      <product-description :description="product.description" />
      <product-variant-select v-if="currentVariant" :product="product" :variant="currentVariant" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
// import your own components here
// import ProductSpecial from '~/components/ComponentName'
export default {
  components: {
    // export your components by name here:
    // ComponentName
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    currentVariant () {
      if (this.variant != null) {
        return this.variant
      } else {
        return this.product.variants[0]
      }
    }
  },
  watch: {
    variant (val) {
      if (val != null) {
        this.setVariant(this.variant)
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart'])
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}
</style>
