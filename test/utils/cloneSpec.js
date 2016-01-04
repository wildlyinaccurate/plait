import clone from '../../src/utils/clone'
import State from '../../src/State'

describe('utils/clone', () => {

  it('performs a shallow clone', () => {
    const o1 = { a: 1 }
    const o2 = clone(o1)

    o2.a = 2

    expect(o1.a).toBe(1)
    expect(o2.a).toBe(2)
  })

  it('clones arrays', () => {
    const o1 = { a: [1, 2] }
    const o2 = clone(o1)

    o2.a.push(3)

    expect(o1.a).toEqual([1, 2])
    expect(o2.a).toEqual([1, 2, 3])
  })

  it('performs a deep clone', () => {
    const o1 = {
      a: {
        b: 1,
        c: {
          d: 1
        }
      }
    }

    const o2 = clone(o1)

    o2.a.b = 2
    o2.a.c.d = 2

    expect(o1.a.b).toBe(1)
    expect(o2.a.b).toBe(2)
    expect(o1.a.c.d).toBe(1)
    expect(o2.a.c.d).toBe(2)
  })

  it('clone State objects', () => {
    const o1 = {
      m: new State({
        a: 1,
        m: new State({
          b: 1
        })
      })
    }

    const o2 = clone(o1)
    o2.m = o2.m.set('a', 2)

    expect(o1.m.get('a')).toBe(1)
    expect(o2.m.get('a')).toBe(2)
    expect(o2.m.get('m').get('b')).toBe(1)
  })

})
