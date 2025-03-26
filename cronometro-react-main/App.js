import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      timer: null, 
      botao: 'iniciar',
    };

    this.iniciar = this.iniciar.bind(this);
    this.zerar = this.zerar.bind(this);
  }

  iniciar(){
    let state = this.state;

    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
      this.state.pausar = 'pausar'
    }else{
      this.timer = setInterval(() => {
        let state = this.state
        state.numero += 0.1;
        this.setState(state); 
      }, 100);
      state.botao = 'Pausar'
    }
  }

  zerar() {
    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
    }
    let state = this.state;
    state.numero = 0;
    state.botao = 'Iniciar';
    this.setState(state)
  }

  render() {
    return (
      <div>
        <a>{this.state.numero.toFixed(1)}</a>
        <div>
          <button onClick={this.iniciar}>{this.state.botao}</button>
          <button onClick={this.zerar}>Zerar</button>
        </div>
      </div>
    );
  }
}

export default App;
