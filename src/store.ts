import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from "./modules";
import thunk from 'redux-thunk'
import {cacheState} from "./persist";

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
   cacheState(store.getState());
});