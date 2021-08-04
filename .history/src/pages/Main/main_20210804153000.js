import React, { Component } from 'react'
import DiaryBtn from '../../components/btn/MainDiaryBtn'
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
                <div id="btn_box">
                <button id='sign_up_btn'>가입</button>
                <DiaryBtn/>
                </div>
            </div>
        )
    }
}
