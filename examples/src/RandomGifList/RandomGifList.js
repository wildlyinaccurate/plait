import { h, initializeComponent, forwardDispatch } from 'plait'

import * as RandomGif from '../RandomGif/RandomGif'


const ENTER_KEY = 13


export function init () {
  return {
    topic: '',
    gifs: []
  }
}


export function update (state, action, dispatch) {
  switch (action.type) {
    case 'ADD_GIF':
      const value = action.$event.target.value

      if (action.$event.keyCode === ENTER_KEY && value.length) {
        const gifIdx = state.get('gifs').length
        const randomGif = initializeComponent(
          { init: RandomGif.init(state.get('topic')) },
          forwardDispatch({ type: 'MODIFY', gifIdx }, dispatch)
        )

        return state.update('gifs', gifs => gifs.concat(randomGif))
      }

      return state.set('topic', value)

    case 'MODIFY':
      return state.update('gifs', gifs => gifs.map(updateGif(action)))
  }
}

function updateGif (action) {
  return (gifState, idx) => {
    if (idx === action.gifIdx) {
      return RandomGif.update(gifState, action.$fwdAction)
    }

    return gifState
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
  return state.get('gifs').map((gifState, gifIdx) => {
    return (
      <div style="float: left; margin-right: 1rem;">
        {RandomGif.view(gifState, forwardDispatch({ type: 'MODIFY', gifIdx }, dispatch, gifState))}
      </div>
    )
  })
}
