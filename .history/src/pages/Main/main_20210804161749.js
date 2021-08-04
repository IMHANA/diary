import React, { Component } from 'react'
import '../Main/main.css';

export default class main extends Component {
    state = {
        btn_num: 1
    }

    signUp = () => {
        this.setState({btn_num: 2});
    }
    render() {
        return (
            <div id="container">
                <div>
                    <input type="text" placeholder='ID'></input>
                </div>
                <div>
                    <input type="text" placeholder="PW"></input>
                </div>
                
                    {
                        this.state.btn_num === 1 ?
                        <div id="btn_box">
                        <button id='sign_up_btn' onClick={this.signUp}>가입</button>
                        <button id='login_btn'>일기</button>
                        </div>
                        :
                        <div id="btn_box">
                        <button id='sign_up_btn' onClick={this.signUp}>가입</button>
                        </div>
                    }
                {/* <button id='sign_up_btn' onClick={this.signUp}>가입</button>
                <button id='login_btn'>일기</button> */}
                
            </div>
        )
    }
}
