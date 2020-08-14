import React, { Component } from 'react';
import axios from 'axios';
import Loader from './loader.gif';

export default class SearchV2 extends Component {
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
        const searchURL = this.state.baseURL + this.state.key + this.state.searchBase + this.state.query
        if (this.cancel) {
            this.cancel.cancel()
        }
        this.cancel = axios.CancelToken.source();
        
        axios
            .get(searchURL, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                this.setState({
                    results: res.data.drinks,
                    loading: false,
                });
                console.log(res)
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to find any search results. Please check network connection or try a new search!',
                    })
                    console.log(error);
                }
            });
    };
    renderSearchResults = () => {
        const {results} = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.slice(0,9).map((result) => {
                        return (
                            <>
                                <h4 className="drink-name">{result.strDrink}</h4>
                                <img className="drink-thumbnail" src={result.strDrinkThumb} alt={result.strDrink} />
                            </>
                        )
                    })}
                </div>
            );
        };
    };
    render() {
        const { query, message, loading } = this.state;

        return (
            <div className="search-container">
                <h1 className="page-welcome">Welcome to HoochNet!</h1>
                <h2 className="page-about">Short for "Hooch Cabinet", we aim to serve as your online liquor cabinet and barkeep!</h2>
                <br /><br />
                <h3 className="search-info">Have a cocktail on your mind, but can't remember how to make it? <br /><br /> Search for it below!</h3>
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value={query}
                        id="search-input"
                        placeholder="Search Here"
                        onChange={this.handleOnInputChange}
                    />
                </label>
                { message && <p className="message">{message}</p> }
                <img src={Loader} className={`search-loading ${loading ? 'show' :
                'hide' }`} alt="Loading" />
                { this.renderSearchResults() }
            </div>
        )
    }
}

// !!! Figure out how to clear result display if user clears search field, also would like to have a title stating what the user has searched for above result display //
