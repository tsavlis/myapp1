import { createStore , compose , applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducers from './reducers';
import thunk from 'redux-thunk';

let reduxCompose = compose; 

if(__DEV__){
    reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(Reducers,reduxCompose(applyMiddleware(promiseMiddleware,thunk)))
}


export default configureStore;