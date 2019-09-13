# Nacelle Stamped.io Nuxt Module

Adds Vue.js components for displaying [Stamped.io](https://stamped.io/) product reviews and star rating badges in your [Nacelle](https://getnacelle.com/) Nuxt project.

## Requirements

* A Nacelle project set up locally. See https://docs.getnacelle.com for getting started.
* A Stamped.io account and app installed on your Shopify store.

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

Next you will have to add the Klaviyo configuration options to `nuxt.config.js` in the `nacelle` config object. You will need you shopify domain and Stamped public API key.

You can find your Stamped api key in their dashboard under "Settings > API Keys". Copy the "API Key Public".

Add these setting parameters to `nuxt.config.js` so it should look something like this:

```
nacelle: {
  spaceID: process.env.NACELLE_SPACE_ID,
  token: process.env.NACELLE_GRAPHQL_TOKEN,
  gaID: process.env.NACELLE_GA_ID,
  fbID: process.env.NACELLE_FB_ID,
  stamped: {
      domain: '<store name here>.myshopify.com',
      apiKey: 'XXXXXXXXXXXX',
    }
},
```

### Add the components to your 

There are two components you can add to your Nacelle site: `<stamped-main-widget />` and `<stamped-star-rating />`.

**Stamped Main Widget** will display a product's reviews and have the form customers to add reviews. Add this component to `pages/products/_handle.vue` or anywhere you use products and pass the product object as a prop.

```
<stamped-main-widget :product="product">
```

**Stamped Star Rating** will render a product's star rating badge. It also takes the product object as a prop.

```
<stamped-star-rating :product="product">
```