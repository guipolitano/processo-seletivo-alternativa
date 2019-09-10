import React, { Component } from "react";
import Listagem from "../Listagem/Listagem";
import { Dimmer, Loader } from "semantic-ui-react";
import { FirebaseContext } from "../../firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    let data = [];
    this.props.firebase.videos().then(query => {
      query.forEach(doc => {
        data.push({
          id: doc.id,
          descricao: doc.data().descricao,
          dislikes: doc.data().dislikes,
          video: doc.data().video,
          likes: doc.data().likes,
          titulo: doc.data().titulo
        });
      });
      this.setState({
        data,
        loading: false
      });
    });
  }

  render() {
    const { data, loading } = this.state;
    const { dark } = this.props
    return (
      <React.Fragment>
        <Dimmer active={loading}>
          <Loader indeterminate>Carregando</Loader>
        </Dimmer>
        <FirebaseContext.Consumer>
          {firebase => {
            return data.length !== 0 ? (
              <Listagem autenticado={this.props.autenticado} dark={dark} data={data} />
            ) : (
              <h1 style={{color:"white"}}>Nenhum vídeo cadastrado</h1>
            );
          }}
        </FirebaseContext.Consumer>
      </React.Fragment>
    );
  }
}

export default Home;
