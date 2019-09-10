import React, { Component } from "react";
import { Image, Icon, Card, Embed } from "semantic-ui-react";

class CardVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.item.likes,
      dislikes: this.props.item.dislikes
    };
  }
  clickLike = e => {
    const ID = this.props.item.id;
    let likes = this.state.likes;
    let dislikes = this.state.dislikes;
    if (
      likes === this.props.item.likes &&
      dislikes === this.props.item.dislikes
    ) {
      likes += 1;
    } else if (likes !== this.props.item.likes) {
      likes -= 1;
    } else if (
      likes === this.props.item.likes &&
      dislikes !== this.props.item.dislikes
    ) {
      likes += 1;
      dislikes -= 1;
    }
    this.setState({ likes, dislikes }, () => {
      this.props.firebase.atualizarLikesDislikes(ID, "likes", this.state.likes);
      this.props.firebase.atualizarLikesDislikes(
        ID,
        "dislikes",
        this.state.dislikes
      );
    });
  };

  clickDislike = e => {
    const ID = this.props.item.id;
    let likes = this.state.likes;
    let dislikes = this.state.dislikes;
    if (
      likes === this.props.item.likes &&
      dislikes === this.props.item.dislikes
    ) {
      dislikes += 1;
    } else if (dislikes !== this.props.item.dislikes) {
      dislikes -= 1;
    } else if (
      dislikes === this.props.item.dislikes &&
      likes !== this.props.item.likes
    ) {
      dislikes += 1;
      likes -= 1;
    }
    this.setState({ likes, dislikes }, () => {
      this.props.firebase.atualizarLikesDislikes(ID, "likes", this.state.likes);
      this.props.firebase.atualizarLikesDislikes(
        ID,
        "dislikes",
        this.state.dislikes
      );
    });
  };

  render() {
    const { item, dark } = this.props;
    return (
      <Card className={`video ${dark ? 'dark': ''}`}>
        <Image wrapped ui={false} size="tiny">
          {/* <video width="100%" height="100%" controls>
            <source src={item.video} type="video/mp4" />
          </video> */}
          <Embed url={item.video}/>
        </Image>
        <Card.Content>
          <Card.Header>{item.titulo}</Card.Header>
          <Card.Description>{item.descricao}</Card.Description>
        </Card.Content>
        <Card.Content extra className="likes-dislikes">
          <span className="likes">
            <Icon
              disabled={this.props.autenticado ? false : true}
              link
              onClick={this.clickLike}
              color={this.state.likes !== item.likes ? "blue" : "grey"}
              name="thumbs up"
            />
            <span>{this.state.likes}</span>
          </span>
          <span className="dislikes">
            <Icon
              disabled={this.props.autenticado ? false : true}
              link
              onClick={this.clickDislike}
              color={this.state.dislikes !== item.dislikes ? "red" : "grey"}
              name="thumbs down"
            />
            <span>{this.state.dislikes}</span>
          </span>
        </Card.Content>
      </Card>
    );
  }
}

export default CardVideo;
