import './App.css';
import React, { Component } from 'react'
import MainTemplates from './components/MainTemplates';

class App extends Component {
  render() {
    console.log('메인을 불러온다!')
    return (
      <div>
        <MainTemplates/>
      </div>
    )
  }
}

export default App;
