import React, { Component, memo } from 'react';
import { Add, ArrowBack } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import './newDay.css';
import IconButton from '@material-ui/core/IconButton';
import { Delete, SaveAlt } from '@material-ui/icons';
import { SketchField, Tools } from '../../components/customSketchField';
import { withCookies } from 'react-cookie';

const writeBoard = memo(() => {
  return (
    <div className="writing-board" contentEditable={true}>
      하나
    </div>
  );
});
class DayDetail extends Component {
  state = {
    backgroundColor: '#fff',
    lineColor: 'black',
    lineWidth: 3,
  };

  handleChangePenColor = (e) => {
    if (this.state.lineColor !== e.target.value)
      this.setState({ lineColor: e.target.value });
  };

  handleChangeBackGroundColor = (e) => {
    if (this.state.backgroundColor !== e.target.value)
      this.setState({ backgroundColor: e.target.value });
  };

  home = () => {
    this.setState({ lineWidth: 100 });
    console.log(this.state.lineWidth);
  };

  render() {
    console.error = (function () {
      var error = console.error;

      return function (exception) {
        if (
          (exception + '').indexOf(
            'Warning: A component is `contentEditable`'
          ) != 0
        ) {
          error.apply(console, arguments);
        }
      };
    })();

    const good = '/image/good.png';

    return (
      <div id="container">
        <div style={{ width: '75%', height: '5%' }} id="mid_container">
          <div id="list_container">
            <TextField
              id="menu_box"
              label="일기찾기"
              color="secondary"
              style={{ width: '80px' }}
            />
            <Add style={{ fontSize: '45px' }} />
            <ArrowBack style={{ fontSize: '45px' }} />
          </div>
        </div>
        <div>
          <div id="writing_date">
            <h2>20210803</h2>
          </div>
          <div id="writing_title">
            <h3 id="little_title">#주말 #집 #토마토 #텃밭</h3>
            <div id="title_sticker">
              <img
                className="title_sticker"
                src={good}
                alt={good}
                title={good}
              />
            </div>
          </div>
          <div id="writing_container">
            {/* <div id='paint_area'></div> */}
            {/* <CanvasDraw brushColor="rgba(155,12,60,0.3)" onChange={() => console.log("onChange")} /> */}
            <SketchField
              ref={(c) => (this._sketch = c)}
              width={550}
              height={400}
              tool={Tools.Pencil}
              lineColor={this.state.lineColor}
              lineWidth={this.state.lineWidth}
              backgroundColor={this.state.backgroundColor}
              // onChange={(e)=> console.log(e)}
            />

            <div style={{ display: 'none' }}></div>
            {/* <TextField onKeyDown="if(event.keyCode===13) {let v=this.value, s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}" id="write_area" style={{whiteSpace: "pre-line;"}}></TextField> */}

            <div className="write_area">
              {/* <textarea className="writing-board"></textarea> */}
              <writeBoard />
              {/* <div className="writing-board" contentEditable={true}>
                하나
              </div> */}
            </div>
          </div>
          <div>
            {/* <SketchPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      /> */}
            {/* <label for="colorWell">Color:</label> */}
            <input
              type="color"
              id="brush-color-box"
              onChange={this.handleChangePenColor}
            />
            <input
              type="color"
              id="back-color-box"
              value="#ffffff"
              onChange={this.handleChangeBackGroundColor}
            />
          </div>
          <div id="btn_container">
            <button onClick={this.home}>156165</button>
            <IconButton cols="20" rows="10" aria-label="delete" id="cancle_btn">
              <Delete />
            </IconButton>
            <IconButton aria-label="save" id="save_btn">
              <SaveAlt />
            </IconButton>
            {/* <span id="cancle_btn">이전</span> */}
            {/* <span id='save_btn'>저장</span> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(DayDetail);
