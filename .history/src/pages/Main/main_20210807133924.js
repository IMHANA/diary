import React, { Component } from 'react'
import '../Main/main.css';
import TextField from '@material-ui/core/TextField';

export default class main extends Component {
    state = {
        btn_num: 1
    }

    // 로그인 화면에서 가입버튼 누르면 
    changeBtnNum = () => {
        this.setState({btn_num: 2});
    }

    // 가입버튼 누르면 id 중복체크 하고 insert
    signUp = () => {

        this.setState({btn_num: 1});
    }

    render() {
        return (
            <div id="container">
                <div>
                <TextField id="loginput_box" placeholder="ID" label="ID" />
                    {/* <input type="text" placeholder='ID'></input> */}
                </div>
                <div>
                <TextField id="loginput_box" placeholder="PW" label="PW" />
                    {/* <input type="text" placeholder="PW"></input> */}
                </div>
                
                    {
                        this.state.btn_num === 1 ?
                        <div id="btn_box">
                        <button id='sign_up_btn' onClick={this.changeBtnNum}>가입</button>
                        <button id='login_btn'>일기</button>
                        </div>
                        :
                        <div id="btn_box">
                        <button id='sign_up_btn' onClick={this.signUp}>가입</button>
                        </div>
                    }
            </div>
        )
    }
}
