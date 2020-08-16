import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router';


const Cabinet = () => {
    const params = useParams();
    const userID = params.userID;
    let [cabinetItems, setCabinetItems] = useState([])
    const cabinetURL = "http://localhost:3003/cabinet/auth0|" + userID
    // !!! Edit this route for deployment //
    axios
        .get(cabinetURL)
        .then((results)=> {
            console.log(results);
            
        })
    return (
        <p>Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
    )
}

export default Cabinet;


