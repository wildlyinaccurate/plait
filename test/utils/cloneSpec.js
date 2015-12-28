import clone from '../../src/utils/clone'

describe('utils/clone', () => {

  it('performs a shallow clone', () => {
    const o1 = { a: 1 }
    const o2 = clone(o1)

    o2.a = 2

    expect(o1.a).toBe(1)
    expect(o2.a).toBe(2)
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

})
