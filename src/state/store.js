import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducer';

function loadSavedState() {
  try {
    const savedState = localStorage.getItem('state');

    if (savedState === null) {
      return undefined;
    }

    return JSON.parse(savedState);
  } catch(error) {
    return undefined;
  }
}

function saveState(state) {
  try {
    const stringState = JSON.stringify(state);
    localStorage.setItem('state', stringState);
  } catch (error) {
    // Ignore
  }
}

const initialState = loadSavedState();
const enhancers = [];
const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

store.subscribe(() => {
  saveState(store.getState())
});

export default store;
