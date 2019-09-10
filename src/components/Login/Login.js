import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Login.scss";
import { Form, Button, Card, Input, Icon, Message } from "semantic-ui-react";
import Erros from "../../util/Erros";

const STATE_INICIAL = {
  email: "",
  senha: "",
  error: null
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { ...STATE_INICIAL };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    const { email, senha } = this.state;
    this.props.firebase
      .logar(email, senha)
      .then(() => {
        this.setState({ ...STATE_INICIAL });
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error, senha: "" });
      });
    e.preventDefault();
  };
  render() {
    const { email, senha, error } = this.state;
    const validar = senha === "" || email === "";
    const { dark } = this.props;
    return (
      <React.Fragment>
        <Card className={`login ${dark ? 'dark': ''}`}>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Email</label>
              <Input
                iconPosition="left"
                onChange={this.onChange}
                value={email}
                name="email"
                type="email"
                placeholder="Email"
                required
              >
                <Icon name="at" />
                <input />
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Senha</label>
              <Input
                iconPosition="left"
                onChange={this.onChange}
                value={senha}
                type="password"
                name="senha"
                placeholder="Senha"
                required
              >
                <Icon name="lock" />
                <input />
              </Input>
            </Form.Field>
            <div className="submit-btn">
              <Button type="submit" disabled={validar}>
                Logar
              </Button>
            </div>
            <p style={{color:'#fff'}}>
              Ainda não é cadastrado? 
              <a
                style={{ cursor: "pointer" }}
                onClick={(e)=>{e.preventDefault();this.props.history.push('/cadastro')}}
                href="/cadastro"
              >
                <b> Cadastre-se aqui!</b>
              </a>
            </p>
            {error && (
              <Message compact negative>
                <p>{Erros(error.code)}</p>
              </Message>
            )}
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
