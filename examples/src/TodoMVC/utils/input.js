const ENTER_KEY = 13

export const wasEnterKey = event => event.keyCode === ENTER_KEY

export const wasKeyEvent = event => event.hasOwnProperty('keyCode')
