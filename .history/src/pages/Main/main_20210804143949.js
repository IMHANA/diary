import React, { Component } from 'react'
import '../Main/main.css';

export default class main extends Component {

    render() {
        return (
            <div>
                <div>
                    <input type="text" placeholder='id'></input>
                </div>
                <div>
                    <input type="text" placeholder="pw"></input>
                </div>
                <button id='sign_up_btn'>ㄴ</button>
                <button id='login_btn'>ㄴ</button>
            </div>
        )
    }
}
