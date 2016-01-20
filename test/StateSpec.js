import State from '../src/State'

describe('State', () => {

  it('should return the correct values', () => {
    const state1 = new State({ a: 1, b: 2 })

    expect(state1.get('a')).toBe(1)
    expect(state1.get('b')).toBe(2)
  })

  it("should return undefined for keys which don't exist", () => {
    const state1 = new State({ a: 1 })

    expect(state1.get('foo')).toBe(undefined)
  })

  it('is immutable', () => {
    const state1 = new State({ a: 1 })
    const state2 = state1.set('a', 2)

    expect(state1.get('a')).toBe(1)
    expect(state2.get('a')).toBe(2)
  })

  it('is deeply immutable', () => {
    const state1 = new State({
      foo: {
        baz: {
          bing: 1
        }
      }
    })

    const state2 = state1.setIn(['foo', 'baz', 'bing'], 3)

    expect(state1.getIn(['foo', 'baz', 'bing'])).toBe(1)
    expect(state2.getIn(['foo', 'baz', 'bing'])).toBe(3)
  })

  it('can be converted back to a regular object', () => {
    const state = new State({ a: 1, b: 2 })

    expect(state.toObject()).toEqual({ a: 1, b: 2 })
  })

  describe('.update()', () => {
    it('should update the key with the given function', () => {
      const state1 = new State({ a: 1 })
      const updater = x => x + 1

      const state2 = state1.update('a', updater)

      expect(state1.get('a')).toBe(1)
      expect(state2.get('a')).toBe(2)
    })
  })

})
