import './App.css';
import React, { Component } from 'react'
import Main from './pages/Main/main';

class App extends Component {
  render() {
    console.log('메인을 불러온다!')
    return (
      <div>
        <Main/>
      </div>
    )
  }
}

export default App;
