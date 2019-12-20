<template>
  <div>
    <client-only>
      <div id="stamped-reviews-widget" :data-widget-type="widgetStyle" />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    widgetStyle: {
      type: String,
      default: 'carousel'
    }
  }
}
</script>

<style>
</style>
