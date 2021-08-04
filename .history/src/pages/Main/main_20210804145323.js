import React, { Component } from 'react'
import '../Main/main.css';

export default class main extends Component {

    render() {
        return (
            <div id="container">
                <div>
                    <input type="text" placeholder='id'></input>
                </div>
                <div>
                    <input type="text" placeholder="pw"></input>
                </div>
                <span>
                <button id='sign_up_btn'>가입</button>
                <button id='login_btn'>일기</button>
                </span>
            </div>
        )
    }
}
