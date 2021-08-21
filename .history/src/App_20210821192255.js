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

  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set('user_id', name, { path: '/' });
    this.setState({ name });
  }

  render() {
    const { name } = this.state;

    console.log('메인을 불러온다!', name);
    return (
      <div>
        <button onClick={this.handleNameChange}></button>
        <MainTemplates />
      </div>
    );
  }
}

export default withCookies(App);
