import Vue from 'vue'
import StampedMainWidget from './nacelle/integrations/StampedMainWidget.vue'
import StampedStarRating from './nacelle/integrations/StampedStarRating.vue'
import StampedDisplayWidget from './nacelle/integrations/StampedDisplayWidget.vue'

Vue.component('stamped-main-widget', StampedMainWidget)
Vue.component('stamped-star-rating', StampedStarRating)
Vue.component('stamped-display-widget', StampedDisplayWidget)

function addEventListenerStamped(el, eventName, handler) {
  if (el.addEventListener) { el.addEventListener(eventName, handler) } else { el.attachEvent('on' + eventName, function () { handler.call(el) }) }
}

addEventListenerStamped(document, 'stamped:reviews:loaded', function(e) {
  console.log(e)
  window.stampedLoaded = true
})

export default async context => {
  if (process.browser || process.client) {
    if (window.StampedGlobalOptions) {
      window.StampedGlobalOptions.apiKey = context.env.stamped.apiKey
      window.StampedGlobalOptions.storeUrl = context.env.stamped.domain
    }

    if (window.StampedFn) {
      window.StampedFn.init()
      window.stampedLoaded = true
    }

    context.app.router.afterEach(async (to, from) => {
      window.stampedLoaded = false
      let count = 0
      let stampedInterval

      if (!window.stampedLoaded) {
        stampedInterval = setInterval(stampedRouteChangeHandler, 200)
      }

      function stampedRouteChangeHandler() {
        // Elements that Stamped Targets via data attributes
        const reviewElements = document.querySelectorAll('.stamped-main-badge')
        // Elements that Stamped injects into the DOM
        const badges = document.querySelectorAll('.stamped-badge')
        if (
          window.stampedLoaded ||
          (badges && badges.length) ||
          count > 5
        ) {
          clearInterval(stampedInterval)
        } else {
          if (
            window.StampedFn &&
            window.jQueryStamped &&
            (reviewElements && reviewElements.length)
          ) {
            window.StampedGlobalOptions.apiKey = context.env.stamped.apiKey
            window.StampedGlobalOptions.storeUrl = context.env.stamped.domain

            window.StampedFn.init()
            window.StampedFn.loadBadges()
            window.StampedFn.loadDisplayWidgets()
          }
          count += 1
        }
      }
    })
  }
}
