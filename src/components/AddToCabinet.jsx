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
            selectedIngredient: '',
            user: 'auth0|' + this.props.userID
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

    handleSubmit = (event) => {
        event.preventDefault()
        const body = {
            itemName: this.state.selectedIngredient,  
            userId: this.state.user
        };
        axios
        // !!! EDIT THIS URL FOR DEPLOYMENT !!! //
            .post('http://localhost:3003/cabinet/new', body)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(error => console.log(error));
        window.location.reload();
    }

    render() {
        return (
            <div>
                <select value={this.state.listType} className="ingredient-dropdown" onChange={(e) => this.setState({selectedIngredient: e.target.value})}>
                    {this.state.ingredientOptions.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>{option.display}
                        </option>
                    ))}
                </select>
                <form onSubmit={this.handleSubmit}>
                    <input
                    type='submit'
                    value='Add to Cabinet'
                    className='ingredient-add'/>
                </form>
            </div>
        )
    }
}
