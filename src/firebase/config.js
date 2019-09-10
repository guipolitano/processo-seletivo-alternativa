import firebase from "firebase";

const config = {
  apiKey: "*************",
  authDomain: "*************",
  databaseURL: "*************",
  projectId: "*************",
  storageBucket: "*************",
  messagingSenderId: "***********",
  appId: "*************"
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.firestore();
    this.storage = firebase.storage();
  }
  cadastrar = (email, senha) =>
    this.auth.createUserWithEmailAndPassword(email, senha);

  logar = (email, senha) =>
    this.auth.signInWithEmailAndPassword(email, senha);

  deslogar = () => {this.auth.signOut()};

  videos = () => this.database.collection('videos').orderBy('likes', 'desc').get();

  cadastrarVideo = (dados) => this.database.collection('videos').doc().set(dados);

  atualizarLikesDislikes = (id, atualizacao, valor) => this.database.collection('videos').doc(id).update({[atualizacao]:valor});

}

export default Firebase;
