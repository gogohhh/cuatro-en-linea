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
      finJuego: false,
      mensaje: '',
      score: 0,
      score2: 0
    };

    this.juega = this.juega.bind(this); //* El metodo .bind retorna una nueva funcion que tiene el mismo comportamiento que la funcion original 
   } /** final del constructor */

  //* Función para iniciar los estados del la aplicación, el score no se resetea.
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

    //Al iniciar un nuevo juego seteamos el estado del board, del tiro actual y del fin de juego a false.
    this.setState({
      board,
      tiroActual: this.state.jugador1,
      finJuego: false,
      mensaje: '',
    });
  }

  /** togglePlayer */
  turnoJugador() {
    return (this.state.tiroActual === this.state.jugador1) ? this.state.jugador2 : this.state.jugador1;
    /* el estado del jugador en turno es el estado del tiro actual */
  }

  //* La funcion juega se encarga de mandar un status del tiro/turno actual.
  juega(c){
    if(!this.state.finJuego){     //Si el estado del finjuego es verdadero

      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.tiroActual;
          break;
        }
      }

      //* EL estatus recibe el valor que la funcion comprobarGanador ya proceso (Ver linea: 127)
      let status = this.comprobarGanador();
      if(status === this.state.jugador1){
        this.setState( {board, finJuego: true, mensaje: 'Ganador jugador 1 (rojo)', // counter to state score
          score: this.state.score + 1,
      } );
      } else if (status === this.state.jugador2) {
        this.setState( {board, finJuego: true, mensaje: 'Ganador jugador 2 (amarillo)', score2: this.state.score2 + 1,
      } );
      }
      else{
        this.setState( {board, tiroActual: this.turnoJugador()});
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
    for (let r = 0; r < 3; r++) {   //* recorre las filas a 3 hasta que llegue una cuarta y se declare el ganador
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


  //* La función comprobar ganador recibe los valores de las funciones checkVertical, chackHorizonatl y checkDiagonal para cada final de juego. 
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

        <div className="score">
          <strong><p className="player1">Jugador 1: <span>{this.state.score}</span></p></strong>
          <strong><p className="player2">Jugador 2: <span>{this.state.score2}</span></p></strong>
        </div>

        <table>
          <thead>
          </thead>
          <tbody>
            {/* Recorremos el array row */}
            {this.state.board.map((row, i) => (<Row key={i} row={row} index={this.juega} />) )}
          </tbody>
        </table>

        <div>
         <h5 class="mensaje">{this.state.mensaje}</h5> 
        </div>
        
      </div>
    );
  }
}


export default App;
