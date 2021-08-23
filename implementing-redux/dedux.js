function createStore() {
  if (arguments.length === 0) {
    throw new Error('You must have at least one argument')
  }

  if (typeof arguments[0] !== 'function') {
    throw new Error('Reducer must be a function')
  }

  const reducer = arguments[0]
  let state = arguments.length >= 2 ? arguments[1] : reducer(undefined, { type: 'fake action' })
  const enhancer = arguments.length >= 3 ? arguments[2] : () => (dispatch) => action => dispatch(action)

  return _createStore(reducer, state, enhancer)
}

function _createStore(reducer, state, enhancer) {
  const store = {}
  const listeners = []

  store.getState = () => state;

  store.dispatch = (action) => {
    if (typeof action !== 'object' || typeof action.type !== 'string') {
      throw new Error('action must be of type { type: string, ...any }')
    }
    let dispatch = _dispatch(state, reducer, listeners)
    if (typeof enhancer === 'function') {
      dispatch = enhancer(store)(dispatch)
      const st = dispatch(action)
      state = st
      return state
    }

  }

  store.subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return store
}

function _dispatch(state, reducer, listeners) {
  return function (action) {
    state = reducer(state, action)
    listeners.forEach((l) => l(state))
    return state
  };
}

function applyMiddleware(...middlewareFactories) {
  return function enhancer(store, dispatch) {
    middlewareFactories.forEach(factory => {
      dispatch = factory(store)(dispatch)
    })
    return dispatch
  }
}


export default {
  createStore,
  applyMiddleware,
}