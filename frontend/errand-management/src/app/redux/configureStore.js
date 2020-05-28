import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import createRootReducer from "./rootReducers";

const configureStore = (initialState) => {
  const middleware = applyMiddleware(thunk);

  const store = createStore(createRootReducer(), initialState, middleware);

  return store;
};

export default configureStore;
