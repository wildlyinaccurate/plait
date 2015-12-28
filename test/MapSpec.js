import Map from '../src/Map'

describe('Map', () => {

  it('is immutable', () => {
    const map1 = new Map({ a: 1 })
    const map2 = map1.set('a', 2)

    expect(map1.get('a')).toBe(1)
    expect(map2.get('a')).toBe(2)
  })

  it('is deeply immutable', () => {
    const map1 = new Map({
      foo: {
        baz: {
          bing: 1
        }
      }
    })

    const map2 = map1.setIn(['foo', 'baz', 'bing'], 3)

    expect(map1.getIn(['foo', 'baz', 'bing'])).toBe(1)
    expect(map2.getIn(['foo', 'baz', 'bing'])).toBe(3)
  })

  describe('.update()', () => {
    it('should update the key with the given function', () => {
      const map1 = new Map({ a: 1 })
      const updater = x => x + 1

      const map2 = map1.update('a', updater)

      expect(map1.get('a')).toBe(1)
      expect(map2.get('a')).toBe(2)
    })
  })

})
