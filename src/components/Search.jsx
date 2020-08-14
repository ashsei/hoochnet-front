import React, { Component } from 'react';
import axios from 'axios';
import Results from './SearchResults';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseURL: 'https://www.thecocktaildb.com/api/json/v1/',
            // !!! Replace below with production key when received from Patreon - Hide in .env before pushing  //
            key: '1/',
            searchBase: 'search.php?s=',
            searchQuery: '',
            results: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.get(this.state.baseURL + this.state.key + this.state.searchBase + this.state.searchQuery)
            .then((response) => {
                const results = response
                // !!! Take Out Below Prior to Production --- Need to pass results down to search result component //
                console.log(results)
                this.setState({
                    results: results
                })
            })
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    render() {
        return (
            <>
                <div className="search-container">
                    <h1 className="page-welcome">Welcome to HoochNet!</h1>
                    <h2 className="page-about">Short for "Hooch Cabinet", we aim to serve as your online liquor cabinet and barkeep!</h2>
                    <br /><br />
                    <h3 className="search-info">Have a cocktail on your mind, but can't remember how to make it? <br /><br /> Search for it below!</h3>
                    <form className="search" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            id="searchQuery"
                            className="search-bar"
                            onChange={this.handleChange}
                            value={this.state.searchQuery}
                        /> <br />
                        <input
                            type="submit"
                            value="Find a Cocktail"
                            className="search-button"
                        />
                    </form>
                </div>
                {/* !!! Prior to production release change this to its own page */}
                <div className="results">
                    <Results results={this.state.results}/>
                </div>
            </>    
        )
    }
}
