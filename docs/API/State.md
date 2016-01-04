# State

The State class wraps an object and makes it immutable by allowing access to it only through State's API.

* [`constructor(object)`](#constructor)
* [`set(key, value)`](#set)
* [`get(key)`](#get)
* [`update(key, updater)`](#update)
* [`setIn(keyPath, value)`](#setIn)
* [`getIn(keyPath)`](#getIn)


<hr>

### <a id="constructor"></a> [`constructor(object)`](#constructor)

Creates a new State object, with the initial state set to the value of `object`.

#### Arguments

##### `object` (Object)

The initial state.

#### Returns

(State) A new State object.


<hr>

### <a id="get"></a> [`get(key)`](#get)

Retrieves the value stored at `key`.

#### Arguments

##### `key` (String)

The key to retrieve.

#### Returns

(any) The value, or `undefined` if the key doesn't exist.


<hr>

### <a id="set"></a> [`set(key, value)`](#set)

Sets the value at `key`.

#### Arguments

##### `key` (String)

The key to set.

##### `value` (any)

The value to set.

#### Returns

(State) The modified State object. The original State object is not changed.


<hr>

### <a id="update"></a> [`update(key, updater)`](#update)

Calls `updater` on the value at `key`, and sets the value at `key` to the result. Equivalent to `state.set(key, updater(state.get(key)))`.

#### Arguments

##### `key` (String)

The key to update.

##### `updater` (Function)

The function to call on the value at `key`.

#### Returns

(State) The modified State object. The original State object is not changed.


<hr>

### <a id="getIn"></a> [`getIn(keyPath)`](#getIn)

Retrieves the value at a key path.

```js
state = new State({
  a: {
    b: 'Hello!'
  }
})

state.getIn(['a', 'b']) // -> 'Hello!'
```

#### Arguments

##### `keyPath` (Array)

The key path to retrieve.

#### Returns

(any) The value, or `undefined` if the key doesn't exist.


<hr>

### <a id="setIn"></a> [`setIn(keyPath, value)`](#setIn)

Sets the value at a key path.

```js
state = new State({
  a: {
    b: 'Hello!'
  }
})

newState = state.setIn(['a', 'b'], 'Bonjour!')

newState.getIn(['a', 'b']) // -> 'Bonjour!'
```

#### Arguments

##### `keyPath` (Array)

The key path to retrieve.

##### `value` (any)

The value to set.

#### Returns

(State) The modified State object. The original State object is not changed.

