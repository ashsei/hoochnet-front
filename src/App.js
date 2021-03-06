import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import Recipe from './components/Recipe';
import Cabinet from './components/Cabinet';
import Random from './components/Random';
import Popular from './components/Popular';



export default class App extends Component {
  render() {
    
    return (
      <div className="container">
          <BrowserRouter>
            <Header />
            <Switch>
              {/* Home Route */}
              <Route exact path="/"
              render={() => ( <Home /> )} />
              {/* Profile Route */}
              <Route exact path="/profile/" 
              render={() => ( <Profile /> )} />
              {/* Recipes Route */}
              <Route exact path="/recipes/:drinkID/"
              render={() => ( <Recipe /> )} />
              {/* Cabinet Route */}
              <Route exact path="/cabinet/:userID/"
              render={() => ( <Cabinet /> )} />
              {/* Random Route */}
              <Route exact path="/random/"
              render={() => ( <Random /> )} />
              {/* Popular Route */}
              <Route exact path="/popular"
              render={() => ( <Popular /> )} />
            </Switch>
            <Footer />
          </BrowserRouter>
      </div>
    )
  }
}
