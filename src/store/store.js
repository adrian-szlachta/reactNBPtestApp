import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const initialState = {
    currencyList: [{rates:['A'], tableName: 'A'}, {rates:['B'], tableName: 'B'}, {rates:['C'], tableName: 'C'}],
    currencyFavouriteList: [],
    currency: {},
    isLoading: false,
    toggleTable: ''
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_CURRENCY_LIST':
            return {...state, currencyList: action.currencyList };
        case 'SET_CURRENCY_FAVOURITE_LIST':
            return {...state, currencyFavouriteList: action.currencyFavouriteList };
        case 'SET_CURRENCY':
            return {...state, currency: action.currency };
        case 'SET_LOADING':
            return {...state, isLoading: action.isLoading };
        case 'SET_TOGGLE':
            return {...state, toggleTable: action.toggleTable };
        default:
            return state;
    }
    return state;
}

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(thunk))
);

export default store;
