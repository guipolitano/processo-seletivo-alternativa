import React, { Component } from "react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import { HashRouter } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import MenuHorizontal from "../Menu/MenuHorizontal";
import Rotas from "../../util/Rotas";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { autenticado: null, dark:false };
    this.handleDarkMode = this.handleDarkMode.bind(this);
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(autenticado => {
      autenticado
        ? this.setState({ autenticado })
        : this.setState({ autenticado: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleDarkMode(){
    let dark = !this.state.dark;
    this.setState({dark})
  }

  render() {
    const {dark} = this.state
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return (
            <HashRouter>
              <MenuHorizontal handleDarkMode={this.handleDarkMode} dark={dark} autenticado={this.state.autenticado} firebase={firebase} />
              <div className={`container ${dark ? 'dark' : ''}`}>
                <Grid>
                  <Rotas dark={dark} autenticado={this.state.autenticado}/>
                </Grid>
              </div>
            </HashRouter>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default App;
