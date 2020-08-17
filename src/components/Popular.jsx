import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Popular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL : 'https://www.thecocktaildb.com/api/json/v2/',
            key : process.env.REACT_APP_COCKTAIL_API_KEY,
            searchBase : '/popular.php',
            searchResults: [],
        }
    }
    componentDidMount() {
        const searchURL = this.state.baseURL + this.state.key + this.state.searchBase
        axios
            .get(searchURL)
            .then((response) => {
                console.log(response)
                this.setState ({
                    searchResults: response.data.drinks
                })
                console.log(this.state.searchResults)
            })
    }
    render() {
        return (
            <div className="popular-results-container">
                <ul>
                {this.state.searchResults.map(result => 
                    <li>
                        <Link to = {`/recipes/${result.idDrink}`}>
                            <h4 className="drink-name">{result.strDrink}</h4>
                            <img className="drink-thumbnail" src={result.strDrinkThumb} alt={result.strDrink} />
                        </Link>
                    </li>
                )}
                </ul>
                <button onClick={()=> window.location.reload()}>Randomize!</button>
            </div>
        )
    }
}
