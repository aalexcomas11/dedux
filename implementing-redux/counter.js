import Dedux from './dedux.js'
const { createStore } = Dedux



const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'UP':
      return state + 1
    case 'DOWN':
      return state === 0 ? 0 : state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

const count = document.querySelector('#count')
const up = document.querySelector('#up')
const down = document.querySelector('#down')
const reset = document.querySelector('#reset')


const store = createStore(reducer, parseInt(count.innerHTML))

function setCount(num) {
  count.innerHTML = num
}

up.addEventListener('click', () => {
  console.log('click')
  const newState = store.dispatch({
    type: 'UP'
  })
  setCount(newState)
})

down.addEventListener('click', () => {
  const newState = store.dispatch({
    type: 'DOWN'
  })
  setCount(newState)
})

reset.addEventListener('click', () => {
  const newState = store.dispatch({
    type: 'RESET'
  })
  setCount(newState)
})