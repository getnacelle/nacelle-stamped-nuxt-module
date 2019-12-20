import Vue from 'vue'
import StampedMainWidget from './nacelle/integrations/StampedMainWidget.vue'
import StampedStarRating from './nacelle/integrations/StampedStarRating.vue'
import StampedDisplayWidget from './nacelle/integrations/StampedDisplayWidget.vue'

Vue.component('stamped-main-widget', StampedMainWidget)
Vue.component('stamped-star-rating', StampedStarRating)
Vue.component('stamped-display-widget', StampedDisplayWidget)

function addEventListenerStamped(el, eventName, handler) { 
  if (el.addEventListener) { el.addEventListener(eventName, handler); }
  else { el.attachEvent('on' + eventName, function () { handler.call(el); }); } 
}

addEventListenerStamped(document, 'stamped:reviews:loaded', function(e) {
  console.log(e);
});