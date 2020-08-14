import React, { Component } from 'react'

export default class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: this.props.results,
        }
    }
    render() {
        return (
            <div>
                <ul>
                    { this.state.results.map(result => <li>result.drinks.strDrink</li>) }
                </ul>
            </div>
        )
    }
}
