import React, { Component } from 'react';
import { Add, ArrowBack, Flag, ExpandMore, Minimize } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import styles from './newDay.css';

export default class NewDay extends Component {
  render() {
    const good = '/image/good.png';

    return (
      <div id="container">
        <div className="list-con2">
          <TextField
            id="standard-secondary"
            label="일기찾기"
            color="secondary"
            style={{ width: '80px' }}
          />
          <Add style={{ fontSize: '45px' }} />
          <ArrowBack style={{ fontSize: '45px' }} />
        </div>
        <div>
          <h2>20210803</h2>
        </div>
        <div id='writing_title'>
          <h3 id='little_title'>#주말 #집 #토마토 #텃밭</h3>
          <div id='title_sticker'>
            <img className="sticker" src={good} alt={good} title={good} />
          </div>
        </div>
        <div id='writing_container'>
          <div id='paint_area'></div>
          <TextField id="write_area"></TextField>
        </div>
        <div id='btn_container'>
          <span id="cancle_btn">이전</span>
          <span id='save_btn'>저장</span>
        </div>
      </div>
    );
  }
}
