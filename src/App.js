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
    
    
  }
  

  render() {
    return (
    
      <div>
        <h2>Juego Conecta 4</h2>
        
        <table>
          <thead>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        
      </div>
    );
  }
}


export default App;
