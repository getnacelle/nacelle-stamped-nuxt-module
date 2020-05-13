# Nacelle Stamped.io Nuxt Module

Adds Vue.js components for displaying [Stamped.io](https://stamped.io/) product reviews and star rating badges in your [Nacelle](https://getnacelle.com/) Nuxt project.

## Requirements

- A Nacelle project set up locally. See https://docs.getnacelle.com for getting started.
- A Stamped.io account and app installed on your Shopify store.

## Setup

### Add Module to Nacelle

Once you hace Nacelle and Stamped set up you can install this module in your project from `npm`:

```
npm install @nacelle/nacelle-stamped-nuxt-module --save
```

After the package has installed, open `nuxt.config.js`. Under `modules` add `@nacelle/nacelle-stamped-nuxt-module` to the array. It should look something like this:

```
modules: [
  '@nuxtjs/pwa',
  '@nuxtjs/dotenv',
  '@nacelle/nacelle-nuxt-module',
  '@nuxtjs/sitemap',
  '@nacelle/nacelle-stamped-nuxt-module'
],
```

Next you will have to add the Stamped configuration options to `nuxt.config.js` in the `env` config object. You will need you shopify domain and Stamped public API key.

You can find your Stamped api key in their dashboard under "Settings > API Keys". Copy the "API Key Public".

Add these setting parameters to `nuxt.config.js` so it should look something like this:

```
env: {
  nacelleSpaceID: process.env.NACELLE_SPACE_ID,
  nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
  buildMode: process.env.BUILD_MODE,
  stamped: {
    domain: '<store name here>.myshopify.com',
    apiKey: 'XXXXXXXXXXXX',
  }
},
```

### Add the components to your site

There are two components you can add to your Nacelle site: `<stamped-main-widget />` and `<stamped-star-rating />`.

**Stamped Main Widget** will display a product's reviews and have the form customers to add reviews. Add this component to `pages/products/_handle.vue` or anywhere you use products and pass the product object as a prop.

```
<stamped-main-widget :product="product">
```

**Stamped Star Rating** will render a product's star rating badge. It also takes the product object as a prop.

```
<stamped-star-rating :product="product">
```

**Stamped Display Widget** will render a display widget. It also takes the widgetStyle string as a prop.

Options include:
- [Carousel](https://help.stamped.io/article/44-display-widgets#carousel) => `'carousel'`
- [Full Page](https://help.stamped.io/article/44-display-widgets#full-page) => `'full-page'`
- [Visual Gallery](https://help.stamped.io/article/44-display-widgets#gallery) => `'visual-gallery'`
- [Wall Photos](https://help.stamped.io/article/44-display-widgets#wall-photos) => `'wall-photos'`
- [Site Badge](https://help.stamped.io/article/44-display-widgets#site-badge) => `'site-badge'`
- [Side Drawer](https://help.stamped.io/article/44-display-widgets#drawer) => `'drawer'`
- [Instagram Feed](https://help.stamped.io/article/44-display-widgets#instagram) => `'instagram-feed'`
- [Net Promoter Score](https://help.stamped.io/article/44-display-widgets#nps) => `'carousel-nps'`

```
<stamped-star-rating :widgetStyle="full-page">
```

### Asynchronous data and dynamic components
Obviously, a big reason we are using vue and nuxt is for dynamic content. This plugin taps into the router and reloads the stamped widgets on a per page basis. However, if there are any components being loaded dynamically than we need to manually trigger a reload.

Its better to do this in bulk to reduce network requests.

```js
export default {
  data() {
    return {
      products: []
    }
  },
  async mounted() {
    const response = await getProducts()
    this.products = response.data.products

    this.$nextTick(() => {
      if (window && window.StampedFn) {
        window.StampedFn.loadBadges()          // Load Badges
        window.StampedFn.loadDisplayWidgets()  // Load Widgets
        window.StampedFn.reloadUGC()           // Load reloadUGC
      }
    })
  }
}
```