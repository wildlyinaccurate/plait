import { render } from '../src/Static'
import h from 'virtual-dom/h'
import { map, toUpper } from 'ramda'

const TestComponent = {
  init: () => {
    return {
      likes: ['Fish', 'Cookies', 'Halloumi']
    }
  },

  update: state => state,

  view: (state, dispatch) => {
    dispatch({ type: '^_^' })
    return h('ul', state.likes.map(like => h('li', [like])))
  }
}

describe('Static', () => {

  it('should render a component with its initial state by default', () => {
    expect(render(TestComponent)).toBe('<ul><li>Fish</li><li>Cookies</li><li>Halloumi</li></ul>')
  })

  it('should allow state to be manipulated', (done) => {
    const update = (state, cb) => {
      setTimeout(() => {
        cb(Object.assign({}, state, {
          likes: map(toUpper, state.likes)
        }))
      }, 100)
    }

    render(TestComponent, update).then(html => {
      expect(html).toBe('<ul><li>FISH</li><li>COOKIES</li><li>HALLOUMI</li></ul>')

      done()
    })
  })

})
