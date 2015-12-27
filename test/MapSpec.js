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
        bar: 1,
        baz: {
          bing: 1
        }
      }
    })

    const map2 = map1.setIn(['foo', 'bar'], 2)
    const map3 = map1.setIn(['foo', 'baz', 'bing'], 3)

    expect(map1.getIn(['foo', 'bar'])).toBe(1)
    expect(map1.getIn(['foo', 'baz', 'bing'])).toBe(1)

    expect(map2.getIn(['foo', 'bar'])).toBe(2)
    expect(map2.getIn(['foo', 'baz', 'bing'])).toBe(1)
    expect(map3.getIn(['foo', 'baz', 'bing'])).toBe(3)
    expect(map3.getIn(['foo', 'bar'])).toBe(1)
  })

})
