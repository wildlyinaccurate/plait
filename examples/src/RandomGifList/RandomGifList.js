import h from 'virtual-dom/h'
import { initializeComponent, forwardDispatch } from 'App'

import * as RandomGif from '../RandomGif/RandomGif'


export function init () {
  return {
    topic: '',
    gifs: []
  }
}


export function update (state, action) {
  switch (action.type) {
    case 'ADD_GIF':
      const value = action.event.target.value

      if (action.event.key === 'Enter' && value.length) {
        const randomGif = initializeComponent({
          init: RandomGif.init(state.get('topic'))
        })

        return state.update('gifs', gifs => gifs.concat(randomGif))
      } else {
        return state.set('topic', value)
      }

    case 'MODIFY':
      return state.update('gifs', gifs => gifs.map(updateGif(action)))
  }
}

function updateGif (action) {
  return (gifState, idx) => {
    if (idx === action.gifIdx) {
      return RandomGif.update(gifState, action.gifAction)
    } else {
      return gifState
    }
  }
}


export function view (state, dispatch) {
  return (
    <div>
      <input
        placeholder="What kind of gifs do you want?"
        value={state.get('topic')}
        ev-keyup={dispatch({ type: 'ADD_GIF' })}
        ev-change={dispatch({ type: 'ADD_GIF' })}
        style="width: 100%; padding: 1rem; font-size: 1rem;" />

      {randomGifView(state, dispatch)}
    </div>
  )
}

function randomGifView (state, dispatch) {
  const appendGifAction = (action, gifAction) => Object.assign({}, action, { gifAction })

  return state.get('gifs').map((gifState, gifIdx) => {
    return (
      <div style="float: left; margin-right: 1rem;">
        {RandomGif.view(gifState, forwardDispatch(dispatch, gifState, { type: 'MODIFY', gifIdx }, appendGifAction))}
      </div>
    )
  })
}
