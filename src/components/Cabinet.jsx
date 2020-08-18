import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router';
import AddToCabinet from "./AddToCabinet";
import { Link } from 'react-router-dom';



class Cabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cabinetItems: [],
            selectedIngredients: [],
            recipeResults: [],
        }
    }
    componentDidMount() {
        const userID = this.props.match.params.userID;
        let baseURL;
        if(process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:3003/'
        } else {
            baseURL = 'https://hoochnet-back.herokuapp.com/'
        }
        const cabinetURL = baseURL + "cabinet/auth0|" + userID
        const ingredientURL = baseURL + "ingredient/auth0|" + userID

        axios
            .get(cabinetURL)
            .then(results => {
                let items = results.data.map(result =>{
                    return {key: result._id, itemName: result.itemName}
                });
                this.setState({
                    cabinetItems: [{key: '', itemName: ''}].concat(items)
                });
                console.log(this.state.cabinetItems)
            })
            .catch((error)=> console.log(error));
        axios
            .get(ingredientURL)
            .then(results =>{
                let ingredients = results.data.map(result =>{
                    return {key: result._id, itemName: result.itemName}
                });
                this.setState({
                    selectedIngredients: [{key: '', itemName: ''}].concat(ingredients)
                })
                console.log(this.state.selectedIngredients)
            })
            .catch((error)=> console.log(error));
    }
    handleDelete = (event, result) => {
        event.preventDefault();
        let baseURL;
        if(process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:3003/'
        } else {
            baseURL = 'https://hoochnet-back.herokuapp.com/'
        }
        axios
            .delete(baseURL + 'cabinet/' + result.key)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
        window.location.reload();
    }
    handleUnselect = (event, result) => {
        event.preventDefault();
        let baseURL;
        if(process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:3003/'
        } else {
            baseURL = 'https://hoochnet-back.herokuapp.com/'
        }
        axios
            .delete(baseURL + 'ingredient/' + result.key)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
        window.location.reload();
    }
    handleSelect = (event, result) => {
        event.preventDefault();
        let baseURL;
        if(process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:3003/'
        } else {
            baseURL = 'https://hoochnet-back.herokuapp.com/'
        }
        const body = {
            itemName: result.itemName,  
            userId: 'auth0|' + this.props.match.params.userID
        };
        axios
            .post(baseURL + 'ingredient/new', body)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(error => console.log(error));
        window.location.reload();
        console.log(this.state.selectedIngredients)
    }
    handleSearch = (event) => {
        event.preventDefault();
        let selectedIngredients = []
        for(let i = 0; i < this.state.selectedIngredients.length; i++) {
            if (this.state.selectedIngredients[i].itemName) {
                if (i < this.state.selectedIngredients.length - 1){
                    selectedIngredients = selectedIngredients + this.state.selectedIngredients[i].itemName.replace(" ", '_') + ','
                } else {
                    selectedIngredients = selectedIngredients + this.state.selectedIngredients[i].itemName.replace(" ", '_')
                }
            }
        }
        const searchURL = 'https://www.thecocktaildb.com/api/json/v2/' + process.env.REACT_APP_COCKTAIL_API_KEY + '/filter.php?i=' + selectedIngredients

        axios
            .get(searchURL)
            .then(response => {
                console.log(response.data)
                this.setState({
                    recipeResults: response.data.drinks
                })
                console.log(this.state.recipeResults)
            })
        
    }
    render () {
        return(
            <>
                <ul className="cabinet-items">
                    <br /><br /><br />
                    <p>Your Cabinet Ingredients</p>
                    {this.state.cabinetItems.map(result =>
                    <div>
                        {(result.itemName) && (
                        <li>
                            {result.itemName} 
                            <button onClick={event => this.handleSelect(event, result)}>+</button>
                            <button onClick={event => this.handleDelete(event, result)}>-</button>
                        </li>)}
                    </div>
                    )}
                </ul>
                <ul className="selected-ingredients">
                    <p>Your Selected Ingredients</p>
                    {this.state.selectedIngredients.map(result =>
                        <div>
                            {(result.itemName) && (
                            <li>
                                {result.itemName}
                                <button onClick={event => this.handleUnselect(event, result)}>-</button>
                            </li>)}
                        </div>
                    )}
                    <button onClick={event => this.handleSearch(event)}>Search for Recipes</button>
                </ul>
                <AddToCabinet userID={this.props.match.params.userID}/>
                <ul className="search-results">
                    {this.state.recipeResults.length > 0 &&(
                        <h3 className="results-header">Recipes Including Your Selected Ingredients</h3>
                    )}
                    {this.state.recipeResults.map(result =>
                        <Link to = {`/recipes/${result.idDrink}/`}>
                            <li>{result.strDrink}<img src={result.strDrinkThumb} className="drink-thumbnail"/></li>
                        </Link>)}
                </ul>
            </>
        )
    }
}

export default withRouter(Cabinet);


