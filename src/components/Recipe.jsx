import React, { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Recipe = () => {
    // Axios Call Variables //
    const baseURL = 'https://www.thecocktaildb.com/api/json/v2/';
    const key = process.env.REACT_APP_COCKTAIL_API_KEY;
    const searchBase = '/lookup.php?i=';
    const params = useParams();
    const cocktail = params.drinkID;
    const searchURL = baseURL + key + searchBase + cocktail
    let history = useHistory();
    // Response UseState Hooks //
    // !!! Theres got to be a better way to do this right??? //
    let [drinkName, setDrinkName] = useState('')
    let [instructions, setInstructions] = useState('')
    let [glassware, setGlassware] = useState('')
    let [imageURL, setImageURL] = useState('')
    let [ingredient1, setIngredient1] = useState('')
    let [ingredient2, setIngredient2] = useState('')
    let [ingredient3, setIngredient3] = useState('')
    let [ingredient4, setIngredient4] = useState('')
    let [ingredient5, setIngredient5] = useState('')
    let [ingredient6, setIngredient6] = useState('')
    let [ingredient7, setIngredient7] = useState('')
    let [ingredient8, setIngredient8] = useState('')
    let [ingredient9, setIngredient9] = useState('')
    let [ingredient10, setIngredient10] = useState('')
    let [measure1, setMeasure1] = useState('')
    let [measure2, setMeasure2] = useState('')
    let [measure3, setMeasure3] = useState('')
    let [measure4, setMeasure4] = useState('')
    let [measure5, setMeasure5] = useState('')
    let [measure6, setMeasure6] = useState('')
    let [measure7, setMeasure7] = useState('')
    let [measure8, setMeasure8] = useState('')
    let [measure9, setMeasure9] = useState('')
    let [measure10, setMeasure10] = useState('')
    // Axios Call Based on Drink ID Passed from Search //
    axios
        .get(searchURL)
        .then((res) => {
            setDrinkName(res.data.drinks[0].strDrink)
            setInstructions(res.data.drinks[0].strInstructions)
            setGlassware(res.data.drinks[0].strGlass)
            setImageURL(res.data.drinks[0].strDrinkThumb)
            setIngredient1(res.data.drinks[0].strIngredient1)
            setIngredient2(res.data.drinks[0].strIngredient2)
            setIngredient3(res.data.drinks[0].strIngredient3)
            setIngredient4(res.data.drinks[0].strIngredient4)
            setIngredient5(res.data.drinks[0].strIngredient5)
            setIngredient6(res.data.drinks[0].strIngredient6)
            setIngredient7(res.data.drinks[0].strIngredient7)
            setIngredient8(res.data.drinks[0].strIngredient8)
            setIngredient9(res.data.drinks[0].strIngredient9)
            setIngredient10(res.data.drinks[0].strIngredient10)
            setMeasure1(res.data.drinks[0].strMeasure1);
            setMeasure2(res.data.drinks[0].strMeasure2);
            setMeasure3(res.data.drinks[0].strMeasure3);
            setMeasure4(res.data.drinks[0].strMeasure4);
            setMeasure5(res.data.drinks[0].strMeasure5);
            setMeasure6(res.data.drinks[0].strMeasure6);
            setMeasure7(res.data.drinks[0].strMeasure7);
            setMeasure8(res.data.drinks[0].strMeasure8);
            setMeasure9(res.data.drinks[0].strMeasure9);
            setMeasure10(res.data.drinks[0].strMeasure10);
        })
        .catch((error) => console.log(error))

        return (
            <div className="recipe-container">
                <img src={imageURL} alt={drinkName} className="drink-image"/><br />
                <h2>{drinkName}</h2><br />
                <p>Glassware: {glassware}</p><br />
                <p>Instructions: {instructions}</p><br />
                <ul className="ingredients">
                    <li className="header-li">Ingredients:</li>
                    <li>{measure1} of {ingredient1}</li>
                    <li>{measure2} of {ingredient2}</li>
                    <li>{measure3} of {ingredient3}</li>
                    {(ingredient4 && measure4) && (<li>{measure4} of {ingredient4}</li>)}
                    {(ingredient5 && measure5) && (<li>{measure5} of {ingredient5}</li>)}
                    {(ingredient6 && measure6) && (<li>{measure6} of {ingredient6}</li>)}
                    {(ingredient7 && measure7) && (<li>{measure7} of {ingredient7}</li>)}
                    {(ingredient8 && measure8) && (<li>{measure8} of {ingredient8}</li>)}
                    {(ingredient9 && measure9) && (<li>{measure9} of {ingredient9}</li>)}
                    {(ingredient10 && measure10) && (<li>{measure10} of {ingredient10}</li>)}
                </ul>
                <button onClick={()=> window.location.href="/"}>Back to Home</button>
                <button onClick={() => history.goBack()}>Back to Your Cabinet</button>
            </div>
        )
}

export default Recipe;
