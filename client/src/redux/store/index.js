// import { createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtool-extension';
// import thunk from 'redux-thunk';
// import reducer from '../reducer';

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;
