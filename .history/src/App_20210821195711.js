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
      user_id: cookies.get('user_id') || 'Ben',
    };
  }

  handleNameChange(user_id) {
    const { cookies } = this.props;

    cookies.set('user_id', user_id, { path: '/' });
    this.setState({ user_id });
  }

  render() {
    const { user_id } = this.state;
    let style = {
      display: 'none',
    };

    console.log('메인을 불러온다!', user_id);
    return (
      <div>
        <button onClick={this.handleNameChange} style={style}></button>
        <MainTemplates />
      </div>
    );
  }
}

export default withCookies(App);
