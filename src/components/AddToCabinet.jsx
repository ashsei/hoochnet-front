import React, { Component } from 'react'
import axios from 'axios'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'https://www.thecocktaildb.com/api/json/v2/',
            key: process.env.REACT_APP_COCKTAIL_API_KEY,
            searchBase: '/list.php?i=list',
            ingredientOptions: [],
            listType: '',
        }
    }
    componentDidMount() {
        const searchURL = this.state.baseURL + this.state.key + this.state.searchBase
        
        axios
            .get(searchURL)
            .then(results => {
                let optionsFromApi = results.data.drinks.map(result => {
                    return {value: result.strIngredient1, display: result.strIngredient1}
                });
                this.setState({
                    ingredientOptions: [{value: '', display: 'Select an Ingredient to Add to Your Cabinet'}].concat(optionsFromApi)
                })
            }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <select value={this.state.listType} className="ingredient-dropdown" onChange={(e) => this.setState({listType: e.target.value})}>
                    {this.state.ingredientOptions.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>{option.display}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}
