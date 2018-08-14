import { render } from '../src/Static'
import h from 'virtual-dom/h'
import { map, toUpper } from 'ramda'

const TestComponent = {
  init: () => {
    return {
      likes: ['Fish', 'Cookies', 'Halloumi']
    }
  },

  update: () => {},

  view: (state, dispatch) => {
    dispatch({ type: '^_^' })

    return h('ul', state.get('likes').map(like => h('li', [like])))
  }
}

describe('Static', () => {
  it('should render a component with its initial state by default', done => {
    render(TestComponent).then(html => {
      expect(html).toBe('<ul data-plaitroot=""><li>Fish</li><li>Cookies</li><li>Halloumi</li></ul>')
      done()
    })
  })

  it('should allow state to be manipulated', done => {
    const update = (state, cb) => {
      setTimeout(() => {
        cb(state.update('likes', map(toUpper)))
      }, 100)
    }

    render(TestComponent, update).then(html => {
      expect(html).toBe('<ul data-plaitroot=""><li>FISH</li><li>COOKIES</li><li>HALLOUMI</li></ul>')
      done()
    })
  })
})
