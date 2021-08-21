import './App.css';
import React, { Component } from 'react';
import MainTemplates from './components/MainTemplates';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    console.log('메인을 불러온다!');
    return ReactDOM.render(
      <div>
        <MainTemplates />
      </div>
    );
  }
}

export default App;
