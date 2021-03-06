import React, { Component } from 'react';
import './main.css';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      isLoginView: true,
      user_id: '',
      pwd: '',
      new_id: '',
      new_pwd: '',
      user_info: [],
    };

    // this.changeBtnNum = this.changeBtnNum.bind(this);
    // this.signUp = this.signUp.bind(this);
  }
  // 로그인 시 인풋창값 state에 넣어주기
  handleIdChange = (e) => {
    // const { cookies } = this.props;
    this.setState({
      user_id: e.target.value,
    });
  };
  handlePwdChange = (e) => {
    // handleIdChange()에서 id값 쿠키에 안넣어져서 여기에 넣기
    const { cookies } = this.props;
    cookies.set('user_id', this.state.user_id);
    console.log(cookies.get('user_id'));
    this.setState({
      pwd: e.target.value,
    });
  };

  // 회원가입 시 인풋창값 state에 넣어주기
  handleNewIdChange = (e) => {
    // console.log('new_id : ', e.target.value);
    this.setState({
      new_id: e.target.value,
    });
  };
  handleNewPwdChange = (e) => {
    // console.log('new_pwd : ', e.target.value);
    this.setState({
      new_pwd: e.target.value,
    });
  };

  // 로그인 화면에서 가입버튼 누르면 가입버튼만 보이게
  changeBtnNum = () => {
    this.setState({ isLoginView: false });
  };

  // 가입버튼 누르면 id 중복체크 하고 insert
  signUp = (e) => {
    if (
      this.state.new_id !== '' ||
      this.state.new_id !== 'null' ||
      this.state.new_pwd !== '' ||
      this.state.new_pwd !== 'null'
    ) {
      console.log(
        'new_id: ',
        this.state.new_id,
        ' new_pwd: ',
        this.state.new_pwd
      );
      fetch('http://localhost:3003/user/add', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: this.state.new_id,
          pwd: this.state.new_pwd,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            alert('가입완료, 로그인을 해주세요.');
            // this.set({ isLoginView: false });
            // this.setLogView();
          } else {
            throw new Error('Someting went wrong.');
          }
          // this.set({ isLoginView: true });
        })
        // .then((response) => this.set({ isLoginView: true }))
        // .then(function (json) {
        //   alert('가입완료, 로그인을 해주세요.', json);
        //   this.setState({ isLoginView: true });
        // })
        .catch(function (error) {
          alert('아이디 중복입니다.');
        });
    }
    this.setState({
      new_id: '',
      new_pwd: '',
    });
  };
  // setLogView() {
  //   this.set({ isLoginView: true });
  // }

  //로그인 후 monthly 화면으로 이동
  goDiary = (e) => {
    // e.preventDefault();

    // console.log(this.state.user_id);
    // console.log(this.state.pwd);
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
      credentials: 'include',
      body: JSON.stringify({
        user_id: this.state.user_id,
        pwd: this.state.pwd,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        const { cookies } = this.props;
        console.log('json: ', json);
        cookies.set('user_no', json.user_no);
        // if (!json) {
        //   throw new Error('db에 값이 없는걸??');
        // } else {
        // console.log(json);
        if (json) {
          // alert('ok');
          this.props.history.push('/monthly');
          // setCookie('user_id', this.state.user_id, { path: '/' });
        }
      })
      .catch((e) => alert('아이디와 비밀번호를 다시 입력해주세요.'));

    this.setState({
      user_id: '',
      pwd: '',
    });
    // alert('여기까지는 되나');
  };

  render() {
    return (
      <div id="container">
        <div>
          <img className="main_banner" src="/image/main.png" alt="배너" />
        </div>
        <div>
          {this.state.isLoginView ? (
            <>
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
              </div>
              <div>
                <TextField
                  id="loginput_box"
                  // label="PW"
                  type="password"
                  placeholder="pwd"
                  name="pwd"
                  value={this.state.pwd}
                  onChange={this.handlePwdChange}
                />
              </div>

              {/* <input type="text" placeholder="PW"></input> */}
            </>
          ) : (
            <>
              <div>
                <TextField
                  id="loginput_box"
                  // label="ID"
                  type="text"
                  placeholder="id"
                  name="new_id"
                  value={this.state.new_id}
                  onChange={this.handleNewIdChange}
                />
                {/* <input type="text" placeholder='ID'></input> */}
              </div>
              <div>
                <TextField
                  id="loginput_box"
                  // label="PW"
                  type="text"
                  placeholder="pwd"
                  name="new_pwd"
                  value={this.state.new_pwd}
                  onChange={this.handleNewPwdChange}
                />
                {/* <input type="text" placeholder="PW"></input> */}
              </div>
            </>
          )}
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

export default withCookies(Main);
