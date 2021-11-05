import './App.css';
import React, { Component } from 'react';
import Row from './Row';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      jugador1: 1,
      jugador2: 2,
      tiroActual: null, /** currentPlayer */
      board: [],
      finJuego: false
    };

    this.juega = this.juega.bind(this);

  } /** final del constructor */

  iniciarBoard() {
    // Creamos una matriz de 6x7 para el board
    let board = [];

    for (let r = 0; r < 6; r++) { //recore las filas a 6 filas
      let row = [];
      for (let c = 0; c < 7; c++) {  //recorre las columnas a 7 columnas
        row.push(null) 
      }
      board.push(row); //agrega las filas al board
    }

    this.setState({
      board,
      tiroActual: this.state.jugador1,
      finJuego: false
    });
  }

  /** togglePlayer */
  turnoJugador() {
    return (this.state.tiroActual === this.state.jugador1) ? this.state.jugador2 : this.state.jugador1;
    /* el estado del jugador en turno es el estado del tiro actual */
  }

  juega(c){
    if(!this.state.finJuego){     //Si el estado del finjuego es verdadero

      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.tiroActual;
          break;
        }
      }
      
      let status = this.comprobarGanador();
      if(status === this.state.jugador1){
        this.setState( {board, finJuego: true});
      }

  
      this.setState({  tiroActual: this.turnoJugador() }); // seteamos el estado anterior en una nueva funcion 
    }
  }

  // Comprobar ganador en verticalmente 
  checkVertical(board) {
    // Comprobar que row sea mayor a 3
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] && board[r][c] === board[r-1][c] && board[r][c] === board[r-2][c] && board[r][c] === board[r-3][c]) {
          return board[r][c];
        }
      }
    } 
  }

  // Comprobar ganador en horizontalmente
  checkHorizontal(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] && board[r][c] === board[r][c+1] && board[r][c] === board[r][c+2] && board[r][c] === board[r][c+3]) {
          return board[r][c];
        }
      }
    }
  }

  // comprobar ganador en diagonal
  checkDiagonal(board) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] && board[r][c] === board[r+1][c+1] && 
            board[r][c] === board[r+2][c+2] && 
            board[r][c] === board[r+3][c+3]) 
          {
          return board[r][c];
        }
      }
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c] && board[r][c] === board[r+1][c-1] && board[r][c] === board[r+2][c-2] && board[r][c] === board[r+3][c-3]) {
          return board[r][c];
        }
      }
    }
  }


  // Return checkVertical in a new funtion
  comprobarGanador(board) {
    return this.checkVertical(this.state.board) || this.checkHorizontal(this.state.board) || this.checkDiagonal(this.state.board);
  }


  componentWillMount() {
    this.iniciarBoard();
  }
  

  render() {
    return (
    
      <div>
        <h2>Juego Conecta 4</h2>
        <div className="button" onClick={() => {this.iniciarBoard()}}>Nuevo juego</div>

        <table>
          <thead>
          </thead>
          <tbody>
            {/* Recorremos el array row */}
            {this.state.board.map((row, i) => (<Row key={i} row={row} index={this.juega} />) )}
          </tbody>
        </table>
        
      </div>
    );
  }
}


export default App;
