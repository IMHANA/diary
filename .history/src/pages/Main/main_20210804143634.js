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
                <span id='sing_up_btn'></span>
                <span id='login_btn'></span>
            </div>
        )
    }
}
