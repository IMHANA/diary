import React, { Component } from 'react';
import { Add, ArrowBack, Flag, ExpandMore, Minimize } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

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
        <div>
          <h3>#주말 #집 #토마토 #텃밭</h3>
          <span>
            <img className="sticker" src={good} alt={good} title={good} />
          </span>
        </div>
        <div>
          <div id="paint_area">edfjdsk</div>
          <TextField id="write_area"></TextField>
        </div>
      </div>
    );
  }
}
