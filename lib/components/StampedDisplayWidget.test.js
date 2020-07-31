import { mount } from '@vue/test-utils'
import StampedDisplayWidget from './StampedDisplayWidget.vue'

const wrapper = mount(StampedDisplayWidget, {
  stubs: ['client-only'],
  propsData: {
    widgetStyle: 'carousel'
  }
})

describe('StampedDisplayWidget', () => {
  it('should mount', () => {
    const component = wrapper.find('#stamped-reviews-widget')
    expect(component).not.toBeUndefined()
  })
})
