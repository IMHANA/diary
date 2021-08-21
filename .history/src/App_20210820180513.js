import './App.css';
import React, { Component } from 'react';
import MainTemplates from './components/MainTemplates';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      name: cookies.get('name') || 'Ben',
    };
  }

  render() {
    console.log('메인을 불러온다!');
    return (
      <div>
        {this.state.name}
        <MainTemplates />
      </div>
    );
  }
}

export default App;
