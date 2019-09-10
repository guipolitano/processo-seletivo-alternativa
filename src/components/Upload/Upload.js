import React, { Component, createRef } from "react";
import {
  Card,
  Form,
  Button,
  Label,
  Message,
  Dimmer,
  Loader,
  Grid
} from "semantic-ui-react";
import "./Upload.scss";
import Erros from "../../util/Erros";

const STATE_INICIAL = {
  videoTemp: null,
  video: null,
  descricao: "",
  titulo: "",
  loading: false,
  error: null,
  sucesso: false
};
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = STATE_INICIAL;
  }

  buttonRef = createRef();
  handleClick = e => {
    e.preventDefault();
    this.buttonRef.current.click();
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    this.setState({ loading: true });

    const nomeArquivo = this.state.video.name;
    const d = new Date();
    const data = `${d.getMonth() + 1}-${d.getFullYear()}`;
    const m = d.getMilliseconds();
    const storageRef = this.props.firebase.storage.ref();
    const videoRef = storageRef.child(`${data}/${m}_${nomeArquivo}`);
    videoRef
      .put(this.state.video)
      .then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(url => {
            const dados = {
              descricao: this.state.descricao,
              titulo: this.state.titulo,
              video: url,
              likes: 0,
              dislikes: 0
            };
            this.props.firebase
              .cadastrarVideo(dados)
              .then(this.setState({ ...STATE_INICIAL, sucesso: true }));
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onSelectVideo = e => {
    this.setState(
      {
        videoTemp: null,
        video: null,
        loading: true
      },
      () => {
        const el = document.getElementById("upload");
        const videoUrl = URL.createObjectURL(el.files[0]);
        const videoType = el.files[0].type;
        const video = el.files[0];
        if (videoType !== "video/mp4") {
          this.setState({
            error: { code: "video/mp4" },
            loading: false
          });
        } else {
          this.setState({
            loading: false,
            error: null,
            video,
            videoTemp: {
              videoUrl,
              videoType
            }
          });
        }
      }
    );
  };

  render() {
    const { videoTemp, error, loading, descricao, titulo, sucesso } = this.state;
    const validar = descricao === "" || titulo === "" || videoTemp === null;
    const { dark } = this.props;
    return (
      <React.Fragment>
        <Grid columns="1" centered>
          <Dimmer active={loading}>
            <Loader indeterminate>Preparando os Arquivos, favor aguardar</Loader>
          </Dimmer>
          <Grid.Column computer={3} mobile={12}>
            <Grid.Row>
              {sucesso ? (<Message positive>
                <Message.Header>
                  Seu vídeo foi enviado com sucesso
                </Message.Header>
                <p>
                  Para visualizar, vá para a{" "}
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.history.push("/home")}
                    href="/home"
                  >
                    <b>tela inicial</b>
                  </a>
                </p>
              </Message>): ''}
            </Grid.Row>
            <Grid.Row>
              <Card className={`upload-card ${dark ? 'dark': ''}`} fluid>
                <Form onSubmit={this.onSubmit}>
                  {videoTemp ? (
                    <video width="100%" controls>
                      <source
                        src={videoTemp.videoUrl}
                        type={videoTemp.videoType}
                      />
                    </video>
                  ) : (
                    ""
                  )}

                  <Label
                    className="upload-btn-label"
                    as="label"
                    basic
                    htmlFor="upload"
                  >
                    <Button
                      icon="upload"
                      onClick={this.handleClick}
                      label={{
                        basic: true,
                        content: "Selecione o vídeo"
                      }}
                      labelPosition="right"
                    />
                    <input
                      ref={this.buttonRef}
                      name="video"
                      onChange={this.onSelectVideo}
                      hidden
                      id="upload"
                      type="file"
                      required
                    />
                  </Label>
                  <Form.Field>
                    <label>Título</label>
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="titulo"
                      value={this.state.titulo}
                      placeholder="Título"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Descrição</label>
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="descricao"
                      value={this.state.descricao}
                      placeholder="Descrição"
                      required
                    />
                  </Form.Field>
                  <div className="submit-btn">
                    <Button type="submit" disabled={validar}>
                      Enviar
                    </Button>
                  </div>
                  {error && (
                    <Message compact negative>
                      <p>{Erros(error.code)}</p>
                    </Message>
                  )}
                </Form>
              </Card>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Upload;
