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
                    {/* !!! This isn't working !!! (This component may be replaced with live search functionality leading to a recipe show page based on user selection!) */}
                    { this.state.results.map(result => <li>result.strDrink</li>) }
                </ul>
            </div>
        )
    }
}
