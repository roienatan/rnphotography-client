import {
    combineReducers,
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import thunk from 'redux-thunk';

// actions.js
export const isUserTouching = (bool) => ({
    type: 'IS_USER_TOUCHING',
    bool
});


// reducers.js
export const userTouching = (state = {}, action) => {
    switch(action.type){
        case 'IS_USER_TOUCHING':
            return action.userTouching;
        default:
            return state;
    }
};


export const reducers = combineReducers({
    userTouching
});


// store.js
export function configureStore(initialState = {

}) {
    const store = createStore(reducers, initialState, compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ));
    return store;
};

export const store = configureStore();