import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { FirebaseContext } from "../firebase";

import Login from "../components/Login/Login";
import Cadastro from "../components/Cadastro/Cadastro";
import Home from "../components/Home/Home";
import Upload from "../components/Upload/Upload";

class Rotas extends Component {
  render() {
    const {dark} = this.props;
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return (
            <Switch>
              <Route      
                path="/login"
                render={props => <Login {...props} dark={dark} firebase={firebase} />}
              />
              <Route      
                path="/cadastro"
                render={props => <Cadastro {...props} dark={dark} firebase={firebase} />}
              />
              <Route      
                path="/home"
                render={props => (
                  <Home
                    {...props}
                    autenticado={this.props.autenticado}
                    firebase={firebase} dark={dark}
                  />
                )}
              />
              {this.props.autenticado ? (
                <Route        
                  path="/upload"
                  render={props => <Upload {...props} firebase={firebase} dark={dark} />}
                />
              ) : (
                <Redirect to="/home" />
              )}
              <Redirect from="/" to="/home" />
            </Switch>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default Rotas;
