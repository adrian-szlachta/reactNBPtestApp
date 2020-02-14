const nbpApiUrl = 'http://api.nbp.pl/api/'
const endpoints = {
    tableA: nbpApiUrl + "exchangerates/tables/A/",
    tableB: nbpApiUrl + "exchangerates/tables/B",
    tableC: nbpApiUrl + "exchangerates/tables/C"
}

export default function getAllTables() {
    return function(dispatch) {
        dispatch({ type: "SET_LOADING", isLoading: true })
        let currencyList = [{},{},{}]
        return fetch(endpoints.tableA, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) => {
            currencyList[0].rates = json[0].rates
            currencyList[0].tableName = 'A'
            fetch(endpoints.tableB, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                currencyList[1].rates = json[0].rates
                currencyList[1].tableName = 'B'
                fetch(endpoints.tableC, {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((json) => {
                    currencyList[2].rates = json[0].rates
                    currencyList[2].tableName = 'C'
                    dispatch({ type: "SET_CURRENCY_LIST", currencyList: currencyList })
                    dispatch({ type: "SET_LOADING", isLoading: false })
                });
            });
        });
    };
}

export function setFavouriteCurrency(newFavouriteCurrencyTable) {
    return function(dispatch) {
        dispatch({type: "SET_CURRENCY_FAVOURITE_LIST", currencyFavouriteList: newFavouriteCurrencyTable})
    }
}

export function setCurrency(currency) {
    return function(dispatch) {
        dispatch({type: "SET_CURRENCY", currency: currency})
    }
}

export function setToggle(toggleTable) {
    return function(dispatch) {
        dispatch({type: "SET_TOGGLE", toggleTable: toggleTable})
    }
}


