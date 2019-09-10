import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Cadastro.scss";
import { Form, Button, Card, Input, Icon, Message } from "semantic-ui-react";
import Erros from "../../util/Erros";

const STATE_INICIAL = {
  email: "",
  senha: "",
  confirmar: "",
  error: null
};

class Cadastro extends Component {
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
      .cadastrar(email, senha)
      .then(autenticado => {
        this.setState({ ...STATE_INICIAL });        
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  };
  render() {
    const { email, senha, confirmar, error } = this.state;  
    const validar =
      senha !== confirmar || senha === "" || email === "" || confirmar === "";
    const { dark } = this.props;
    return (
      <React.Fragment>
        <Card className={`cadastro ${dark ? 'dark': ''}`}>
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
            <Form.Field>
              <label>Confirmar Senha</label>
              <Input
                iconPosition="left"
                onChange={this.onChange}
                value={confirmar}
                type="password"
                name="confirmar"
                placeholder="Confirmar Senha"
                required
              >
                <Icon name="lock" />
                <input />
              </Input>
            </Form.Field>
            <div className="submit-btn">
              <Button type="submit" disabled={validar}>
                Cadastrar
              </Button>
            </div>
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

export default withRouter(Cadastro);
