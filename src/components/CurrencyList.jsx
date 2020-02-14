import React, { Component } from "react";
import { connect } from "react-redux";
import getAllTables, { setFavouriteCurrency, setCurrency, setToggle } from '../services/nbp.js';

export class CurrencyList extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            toggleTable: '',
        };
    }

    handleChange(event) {
        this.props.setCurrency(event.target.value)
    }

    componentDidMount() {
        this.props.getAllTables();
    }

    currencyObject = currency => {
        const code = currency.code;
        const currencyName = currency.currency;
        const mid = currency.mid;
        const table = currency.table;
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        { code } { currencyName } { mid } <button onClick={ () => this.deleteFavouriteCurrency(code, table) }>Usuń</button>
                    </p>
                </header>
            </div>
        );
    }

    selectTables = table => {

        let classTableName = 'lista '

        if(this.props.toggleTable === ('active'+table.tableName))
            classTableName+=this.props.toggleTable

        return (
            <div class="table">
                <button onClick={ () => this.toggleTable(table.tableName) }>Pokaż tabele {table.tableName}</button>
                <div className={classTableName} >
                    <button onClick={ () => this.toggleTable() }>Zamknij</button>
                    {table.rates.map((currency)=>{ return this.renderTable(currency, table.tableName)})}
                </div>
            </div>
        );
    }
    toggleTable = (table) => {
        if(table) {
            this.props.setToggle('active'+table)
        } else {
            this.props.setToggle('')
        }
    }

    renderTable = (element, table) => {
        return (
            <div>
                {element.currency}<button onClick={ () => this.setFavouriteCurrency(element.code, table) }>Dodaj</button>
            </div>

        );
    }

    setFavouriteCurrency= (code, table) => {
        const tempTable = this.props.currencyList.filter((currencyTable) => { return currencyTable.tableName === table })
        const newFavouriteCurrency = tempTable[0].rates.filter(function (el) {
            return el.code === code
        });
        const newCurrency = {...newFavouriteCurrency[0], table: table};
        const newFavouriteCurrencyTable = this.props.currencyFavouriteList;
        const existInTableFavourite = this.props.currencyFavouriteList.filter((el) => {return el.code === newCurrency.code && el.table === table});

        if (existInTableFavourite.length === 0) this.props.setFavouriteCurrency(newFavouriteCurrencyTable.concat(newCurrency))
    }

    deleteFavouriteCurrency = (code, table) => {
        const tableFavouriteWithoutDeleteElement = this.props.currencyFavouriteList.filter((el) => {return !(el.code === code && el.table === table)});
        this.props.setFavouriteCurrency(tableFavouriteWithoutDeleteElement)
    }

    deleteAllFavouriteCurrencies = () => {
        const emptyFavouruteCurrencyList = [];
        this.props.setFavouriteCurrency(emptyFavouruteCurrencyList)
    }

    render() {
        return (
            <div className="c-container">
                <div className={"pageloader " + (this.props.isLoading ? 'is-active' : '')}><span className="title">Loading...</span></div>
                <div class="tables">
                    Dodaj do ulubionych z tabeli A, B lub C:
                    {this.props.currencyList.map(this.selectTables)}
                </div>
                Lista ulubionych
                <button onClick={ this.deleteAllFavouriteCurrencies }>Wyczyść ulubione</button>
                <ul>
                    {this.props.currencyFavouriteList.map(this.currencyObject)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currencyList: state.currencyList,
        currencyFavouriteList: state.currencyFavouriteList,
        currency: state.currency,
        isLoading: state.isLoading,
        toggleTable: state.toggleTable
    };
}

export default connect(
    mapStateToProps,
    { getAllTables, setFavouriteCurrency, setCurrency, setToggle }
)(CurrencyList);