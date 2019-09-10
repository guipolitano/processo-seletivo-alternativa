import React, { Component } from "react";
import { List, Card } from "semantic-ui-react";
import "./Listagem.scss";
import { FirebaseContext } from "../../firebase";
import CardVideo from "./CardVideo";

class Listagem extends Component {
  render() {
    const { data, dark } = this.props;

    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return (
            <List horizontal style={{width:'100%'}} size="small">
              <Card.Group centered itemsPerRow={data.length < 4 ? 3 : 4} stackable>
              {data.map((item, index) => (                
                  <CardVideo
                    dark={dark}
                    key={index}
                    autenticado={this.props.autenticado}
                    firebase={firebase}
                    item={item}
                  />
                  ))}
                  </Card.Group>
            </List>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default Listagem;
