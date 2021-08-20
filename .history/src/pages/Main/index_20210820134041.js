import React, { Component } from 'react';
import './main.css';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Link } from 'react-router-dom';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      isLoginView: true,
      user_id: '',
      pwd: '',
      user_info: [],
    };

    this.changeBtnNum = this.changeBtnNum.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleIdChange = (e) => {
    console.log(e.target.value);
    this.setState({
      user_id: e.target.value,
    });
  };
  handlePwdChange = (e) => {
    console.log(e.target.value);
    this.setState({
      pwd: e.target.value,
    });
  };

  // 로그인 화면에서 가입버튼 누르면
  changeBtnNum() {
    this.setState({ isLoginView: false });
  }

  // 가입버튼 누르면 id 중복체크 하고 insert
  signUp() {
    this.setState({ isLoginView: true });
  }

  goDiary = (e) => {
    // e.preventDefault();

    console.log(this.state.user_id);
    console.log(this.state.pwd);
    if (
      this.state.user_id === '' ||
      this.state.user_id === 'null' ||
      this.state.pwd === '' ||
      this.state.pwd === 'null'
    ) {
      e.preventDefault();
    }

    fetch('http://localhost:3003/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: this.state.user_id,
        pwd: this.state.pwd,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        alert(result);
      })
      .catch(function (err) {
        console.log('failed', err);
        // }),
      });
    // .then((response) => {
    //   console.log(response);
    //   if (response === 'true') {
    //     return response.json();
    //   } else {
    //     console.log('');
    //   }
    // })
    // .then((json) => {
    //   this.props.history.push('/monthly');
    // })
    // .catch((err) => console.log(err));

    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    //   this.props.history.push('/monthly');
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    this.setState({
      user_id: '',
      pwd: '',
    });
    alert('여기까지는 되나');
  };

  render() {
    return (
      <div id="container">
        <div>
          <TextField
            id="loginput_box"
            // label="ID"
            type="text"
            placeholder="id"
            name="user_id"
            value={this.state.user_id}
            onChange={this.handleIdChange}
          />
          {/* <input type="text" placeholder='ID'></input> */}
        </div>
        <div>
          <TextField
            id="loginput_box"
            // label="PW"
            type="text"
            placeholder="pwd"
            name="pwd"
            value={this.state.pwd}
            onChange={this.handlePwdChange}
          />
          {/* <input type="text" placeholder="PW"></input> */}
        </div>

        {this.state.isLoginView ? (
          <div id="btn_box">
            <button id="sign_up_btn" onClick={this.changeBtnNum}>
              가입
            </button>
            <button id="login_btn" onClick={this.goDiary}>
              일기
            </button>
          </div>
        ) : (
          <div id="btn_box">
            <button id="sign_up_btn" onClick={this.signUp}>
              가입
            </button>
          </div>
        )}
      </div>
    );
  }
}
