import React, { Component } from 'react';
import axios from 'axios';
import Loader from './loader.gif';
import { Link } from "react-router-dom";
import Login from "./Login.jsx"

// !!! Would like to have a title stating what the user has searched for above result display, edit the way that the results render as well. //
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            baseURL: 'https://www.thecocktaildb.com/api/json/v2/',
            key: process.env.REACT_APP_COCKTAIL_API_KEY,
            searchBase: '/search.php?s=',
            searchURL: '',
        };
        this.cancel = '';
    };
    handleOnInputChange = (event) => {
        const query = event.target.value;
        if ( ! query ) {
            this.setState({ query, results: {}, message: '' });
        } else {
            this.setState({ query, loading: true, message: '' },
            () => {
                this.fetchSearchResults(query);
            });
        }
    };
    fetchSearchResults = (query) => {
        const searchURL = this.state.baseURL + this.state.key + this.state.searchBase + query;
        this.setState({searchURL});
        if (this.cancel) {
            this.cancel.cancel()
        }
        this.cancel = axios.CancelToken.source();
        
        axios
            .get(searchURL, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                let resultNotFoundMsg = !res.data.drinks.length && 'There were no results for that query. Please try another search.';
                this.setState({
                    results: res.data.drinks,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to find any search results. Please check network connection or try a new search!',
                    });
                };
            });
    };
    renderSearchResults = () => {
        const {results} = this.state;
        if (results != null) {
            if (Object.keys(results).length && results.length) {
                return (
                    <div className="results-container">
                        {results.slice(0,9).map((result) => {
                            return (
                                <div className="results">
                                    <Link to = {`/recipes/${result.idDrink}`}>
                                        <h4 className="drink-name">{result.strDrink}</h4>
                                        <img className="drink-thumbnail" src={result.strDrinkThumb} alt={result.strDrink} />              
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                );
            }
        }
    };
    render() {
        const { query, message, loading } = this.state;

        return (
            <div className="search-container">
                <div className="intro-text">
                    <h1 className="page-welcome">Welcome to HoochNet!</h1>
                    <h2 className="page-about">Short for "Hooch Cabinet", we aim to serve as your online liquor cabinet and barkeep!</h2>
                    <br />
                </div>
                <h3 className="search-info">Have a cocktail on your mind, but can't remember how to make it? <br /><br /> Search for it below!</h3>
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value={query}
                        id="search-input"
                        placeholder="🍹🍻🍸Search Here🍸🍻🍹"
                        onChange={this.handleOnInputChange}
                    />
                </label>
                { message && <p className="message">{message}</p> }<br />
                <img src={Loader} className={`search-loading ${loading ? 'show' :
                'hide' }`} alt="Loading" />
                { this.renderSearchResults() }
                
            </div>
        )
    }
}

