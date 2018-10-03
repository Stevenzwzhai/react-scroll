import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scroll from './components/scroll'
import ActionSheet from './components/actionSheet'
class App extends Component {
  constructor() {
    super();
    this.state = {
      dir: 'top',
      showAction: false
    }
  }
  show = (type) => {
    this.setState({
      dir: type,
      showAction: true
    })
  }
  scrollHandler = (pos) => {
    console.log(pos)
  }
  close = () => {
    this.setState({
      showAction: false
    })
  }
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
        <button onClick={this.show.bind(this, 'top')}>up</button>
        <button onClick={this.show.bind(this, 'bottom')}>down</button>
        <button onClick={this.show.bind(this, 'left')}>left</button>
        <button onClick={this.show.bind(this, 'right')}>right</button>
        <button onClick={this.close}>close</button>
        <ActionSheet width={50} height={200} dir={this.state.dir} mask={true} show={this.state.showAction} active={true}>
          <div>test action sheet</div>
        </ActionSheet>
        <div className="list"  onClick={this.close}>
          <Scroll scrollTo={100} scrollHandler={this.scrollHandler}>
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
