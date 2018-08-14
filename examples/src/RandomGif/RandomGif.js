import { h } from 'plait'
import fetch from 'isomorphic-fetch'


export function init (topic) {
  const action = requestMore()
  const initData = {
    topic,
    gifUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs'
  }

  return () => [initData, action]
}


export function update (state, action) {
  switch (action.type) {
    case 'NEW_GIF':
      return state.set('gifUrl', action.gifUrl)
  }
}

function receiveGif (response) {
  return {
    type: 'NEW_GIF',
    gifUrl: response.data.fixed_height_small_url.replace(/^http:/, '')
  }
}

function requestMore () {
  return (dispatch, getState) => {
    const state = getState()

    fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${state.get('topic')}`)
      .then(response => response.json())
      .then(json => dispatch(receiveGif(json)))
  }
}


export function view (state, dispatch) {
  return (
    <div>
      <h2>{state.get('topic')}</h2>

      <img src={state.get('gifUrl')} />

      <br />

      <button className="more" ev-click={dispatch(requestMore())}>
        More Please!
      </button>
    </div>
  )
}
