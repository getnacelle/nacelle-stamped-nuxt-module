import Vue from 'vue'
import StampedMainWidget from './nacelle/integrations/StampedMainWidget.vue'
import StampedStarRating from './nacelle/integrations/StampedStarRating.vue'
import StampedDisplayWidget from './nacelle/integrations/StampedDisplayWidget.vue'

Vue.component('stamped-main-widget', StampedMainWidget)
Vue.component('stamped-star-rating', StampedStarRating)
Vue.component('stamped-display-widget', StampedDisplayWidget)

const apiKey = '<%= options.stamped.apiKey %>'

// load Stamped script
if (process.browser) {
  const smileScript = document.createElement('script')
  smileScript.type = 'text/javascript'
  smileScript.src = 'https://cdn-stamped-io.azureedge.net/files/widget.min.js'
  smileScript.charset = 'utf-8'
  smileScript.defer = 1
  smileScript.setAttribute('data-api-key', apiKey)
  document.getElementsByTagName('head')[0].appendChild(smileScript)
}

function addEventListenerStamped(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler)
  } else {
    el.attachEvent('on' + eventName, function () { handler.call(el) })
  }
}

addEventListenerStamped(document, 'stamped:reviews:loaded', function(e) {
  console.log(e)
})
