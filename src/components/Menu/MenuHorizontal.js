import React, { Component } from "react";
import { Menu, Icon, Responsive, Dropdown } from "semantic-ui-react";
import "./MenuHorizontal.scss";
import { FirebaseContext } from "../../firebase";
import { Link, withRouter } from "react-router-dom";

class MenuHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Se cadastre ou faça Login para poder enviar e curtir videos!",
      activeItem: "home"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleDeslogar = () => {
    this.props.firebase.deslogar();
    this.setState({
      email: "Se cadastre ou faça Login para poder enviar e curtir videos!"
    });
    if (this.props.history.location.pathname !== "/home") {
      this.props.history.push("/home");
    } else {
      window.location.reload();
    }
  };
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      let email;
      if (user) {
        email = `Bem vindo, ${user.email}`;
      } else {
        email = "Cadastre-se ou faça Login para enviar videos!";
      }
      this.setState({ email });
    });
  }

  render() {
    const { activeItem } = this.state;
    const { dark } = this.props;
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return (
            <React.Fragment>
              <Responsive minWidth={442}>
                <Menu
                  className={dark ? "dark" : ""}
                  pointing
                  secondary
                  inverted
                  fixed="top"
                >
                  <Menu.Menu position="right">
                    <Menu.Item className={dark ? "dark" : ""}>
                      {this.state.email}
                    </Menu.Item>
                    <Link to="/home">
                      <Menu.Item
                        className={dark ? "dark" : ""}
                        as="span"
                        name="home"
                        active={activeItem === "home"}
                        onClick={this.handleItemClick}
                      >
                        Home
                      </Menu.Item>
                    </Link>

                    {this.props.autenticado ? (
                      <React.Fragment>
                        <Link to="/upload">
                          <Menu.Item
                            className={dark ? "dark" : ""}
                            as="span"
                            name="upload"
                            active={activeItem === "upload"}
                            onClick={this.handleItemClick}
                          >
                            Upload
                          </Menu.Item>
                        </Link>
                        <Menu.Item
                          className={dark ? "dark" : ""}
                          name="deslogar"
                          onClick={this.handleDeslogar}
                        >
                          Deslogar
                        </Menu.Item>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Link to="/cadastro">
                          <Menu.Item
                            className={dark ? "dark" : ""}
                            as="span"
                            name="cadastrar"
                            active={activeItem === "cadastrar"}
                            onClick={this.handleItemClick}
                          >
                            Cadastrar
                          </Menu.Item>
                        </Link>
                        <Link to="/login">
                          <Menu.Item
                            className={dark ? "dark" : ""}
                            as="span"
                            name="login"
                            active={activeItem === "login"}
                            onClick={this.handleItemClick}
                          >
                            Login
                          </Menu.Item>
                        </Link>
                      </React.Fragment>
                    )}
                    <Menu.Item
                      className={dark ? "dark moon" : "moon"}
                      as="span"
                      style={{ cursor: "pointer" }}
                      onClick={this.props.handleDarkMode}
                    >
                      <Icon name={dark ? "sun" : "moon"} />
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              </Responsive>

              {/* CELULAR */}
              <Responsive maxWidth={441}>
                <Menu
                  className={dark ? "celular dark" : "celular "}
                  pointing
                  secondary
                  inverted
                  fixed="top"
                >
                  <Menu.Menu position="right">
                    <Menu.Item className={dark ? "celular dark" : "celular"}>
                      {this.state.email}
                    </Menu.Item>
                    <Dropdown className={dark ? "celular dark" : "celular"} item icon="bars" simple>
                      <Dropdown.Menu className={dark ? "celular dark" : "celular"}>
                        <Link to="/home">
                          <Dropdown.Item
                            className={dark ? "celular dark" : "celular"}
                            as="span"
                            name="home"
                            active={activeItem === "home"}
                            onClick={this.handleItemClick}
                          >
                            Home
                          </Dropdown.Item>
                        </Link>

                        {this.props.autenticado ? (
                          <React.Fragment>
                            <Link to="/upload">
                              <Dropdown.Item
                                className={dark ? "celular dark" : "celular"}
                                as="span"
                                name="upload"
                                active={activeItem === "upload"}
                                onClick={this.handleItemClick}
                              >
                                Upload
                              </Dropdown.Item>
                            </Link>
                            <Dropdown.Item
                              className={dark ? "celular dark" : "celular"}
                              name="deslogar"
                              onClick={this.handleDeslogar}
                            >
                              Deslogar
                            </Dropdown.Item>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Link to="/cadastro">
                              <Dropdown.Item
                                className={dark ? "celular dark" : "celular"}
                                as="span"
                                name="cadastrar"
                                active={activeItem === "cadastrar"}
                                onClick={this.handleItemClick}
                              >
                                Cadastrar
                              </Dropdown.Item>
                            </Link>
                            <Link to="/login">
                              <Dropdown.Item
                                className={dark ? "celular dark" : "celular"}
                                as="span"
                                name="login"
                                active={activeItem === "login"}
                                onClick={this.handleItemClick}
                              >
                                Login
                              </Dropdown.Item>
                            </Link>
                          </React.Fragment>
                        )}
                        <Dropdown.Item
                          className={dark ? "celular dark moon" : "celular moon"}
                          as="span"
                          style={{ cursor: "pointer" }}
                          onClick={this.props.handleDarkMode}
                        >
                          <Icon name={dark ? "sun" : "moon"} />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Menu>
                </Menu>
              </Responsive>
            </React.Fragment>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default withRouter(MenuHorizontal);
