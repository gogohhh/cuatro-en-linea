import './App.css';
import React, { Component } from 'react';
import Row from './Row';
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      jugador1: 1,
      jugador2: 2,
      tiroActual: null,
      board: []
    };
  } /** final del constructor */

  Board() {
    // Creamos una matriz de 6x7 para el board
    let board = [];

    for (let r = 0; r < 6; r++) { //recore las filas a 6 filas
      let row = [];
      for (let c = 0; c < 7; c++) {  //recorre las columnas a 7 columnas
        row.push(null) 
      }
    }

    this.setState({
      board,
      tiroActual: this.state.jugador1
    });
  }

  turnoJugador() {
    return (this.state.tiroActual === this.state.jugador1) ? this.state.jugador2 : this.state.jugador1;
    {/* el estado del jugador en turno es el estado del tiro actual */}
  }

  juega(c){
    this.setState({  tiroActual: this.turnoJugador() }); {/* seteamos el estado anterior en una nueva funcion */}
  }

  componentWillMount() {
    this.Board();
  }
  

  render() {
    return (
    
      <div>
        <h2>Juego Conecta 4</h2>
        <div className="button" onClick={() => {this.Board()}}>Nuevo juego</div>

        <table>
          <thead>
          </thead>
          <tbody>
            {/* Recorremos el array row */}
            {this.state.board.map((row, i) => (<Row key={i} row={row} index={this.index} />) )}
          </tbody>
        </table>
        
      </div>
    );
  }
}


export default App;
