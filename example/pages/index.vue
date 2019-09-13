<template>
  <div class="page">
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <!-- Begin editing your homepage here -->
    <div v-if="!hasPageData">
      <content-hero-banner
        id="hero-banner"
        background-img-url="https://nacelle-assets.s3-us-west-2.amazonaws.com/hero-banner.jpg"
        background-alt-tag="Update your new Nacelle Store"
        :title="name"
        cta-text="Shop Now"
        cta-url="/shop"
        :cta-handler="() => { this.$router.push('/shop') }"
      />
      <content-side-by-side
        image-url="https://nacelle-assets.s3-us-west-2.amazonaws.com/starship1.jpg"
        title="Image With Text"
        copy="Connect Nacelle to your CMS to update content"
        cta-text="Shop Now"
        cta-url="/shop"
        background-color="#f2eee8"
        :cta-handler="() => { this.$router.push('/shop') }"
      />
      <content-side-by-side
        image-url="https://nacelle-assets.s3-us-west-2.amazonaws.com/starship2.jpg"
        title="Image With Text"
        copy="Connect Nacelle to your CMS to update content"
        cta-text="Shop Now"
        cta-url="/shop"
        background-color="#f2eee8"
        :reverse-desktop="true"
        :cta-handler="() => { this.$router.push('/shop') }"
      />
    </div>
    <!-- End of default content -->

    <page-content :page="page" :products="products">
      <!--
        /****
        /* Customize Your Nacelle Content
        /****
      -->

      <!-- <template v-slot:section="{ section }"> -->

      <!--
            * Edit Hero Banner *
                Available slots:
                name: "background", data: "backgroundImgUrl", "mobileBackgroundImgUrl", "backgroundAltTag"
                name: "body", data: "title", "subtitle", "textColor"
                name: "cta", data: "ctaUrl", "ctaText", "ctaHandler"

          <content-hero-banner
            v-if="section.props.contentType === 'ContentHeroBanner'"
            v-bind="section.props"
          >
            <template v-slot:body="{ title }">
              <h1 class="special-title">{{ title }}</h4>
            </template>
          </content-hero-banner>
      -->

      <!--
            * Edit Side-by-Side Section *
                Available slots:
                name: "body", data: "title", "copy"
                name: "cta", data: "ctaUrl", "ctaText", "ctaHandler"

          <content-side-by-side
            v-if="section.props.contentType === 'ContentSideBySide'"
            v-bind="section.props"
          />
      -->

      <!--
            * Edit Product Grid *
                Available slots:
                name: "header", data: "title"
                name: "products", data: "products", "columns"

          <content-product-grid
            v-if="section.props.contentType === 'ContentProductGrid'"
            v-bind="section.props"
          />
      -->

      <!--
            * Edit Testimonials *

          <content-testimonials
            v-if="section.props.contentType === 'ContentTestimonials'"
            v-bind="section.props"
          />
      -->

      <!-- </template> -->
    </page-content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPage } from '@nacelle/nacelle-graphql-queries-mixins'

export default {
  mixins: [getPage],
  data () {
    return {
      handle: 'homepage'
    }
  },
  computed: {
    ...mapState('space', ['name']),
    hasPageData () {
      if (this.page) {
        if (
          this.page.sections &&
          this.page.sections.length > 0
        ) {
          return true
        }

        if (
          this.page.fields &&
          this.page.fields.body
        ) {
          return true
        }

        return false
      }
    }
  }
}
</script>
