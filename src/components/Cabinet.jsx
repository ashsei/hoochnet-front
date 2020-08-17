import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router';
import AddToCabinet from "./AddToCabinet"


class Cabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cabinetItems: [],
        }
    }
    componentDidMount() {
        const userID = this.props.match.params.userID;
        // !!! EDIT THIS URL FOR DEPLOYMENT !!! //
        const cabinetURL = "http://localhost:3003/cabinet/auth0|" + userID

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
    }
    
    render () {
        return(
            <>
                <ul className="cabinet-items">
                    <br /><br /><br />
                    {this.state.cabinetItems.map(result =>
                    <div key={result._id}>
                        {(result.itemName) && (
                        <li key={result._id}>{result.itemName}</li>)}
                    </div>
                    )}
                </ul>
                <AddToCabinet userID={this.props.match.params.userID}/>
            </>
        )
    }
    
}

export default withRouter(Cabinet);


