import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scroll from './components/scroll'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="list">
        <Scroll>
          <div className="list-item">
          {
            Array(30).fill(1).map((item, key) => {
              return (
                <div className="item" key={key}>{key+'-content-item'}</div>
              )
            })
          }
          </div>
        </Scroll>
        </div>
      </div>
    );
  }
}

export default App;
