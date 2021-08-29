import React, { Component, createRef, memo } from 'react';
import { Add, ArrowBack, Flag, ExpandMore, Minimize } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Delete, SaveAlt } from '@material-ui/icons';
// import CanvasDraw from "react-canvas-draw";
import { SketchField, Tools } from '../../components/customSketchField';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
// import { SketchPicker } from 'react-color';

const writeBoard = memo(() => {
  return (
    <div className="writing-board" contentEditable={true}>
      하나
    </div>
  );
});
class DayDetail extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      year: this.props.location.state.year,
      month: this.props.location.state.month,
      date: this.props.location.state.date,
      full_day: this.props.location.state.full_day,
      backgroundColor: '#fff',
      lineColor: 'black',
      lineWidth: 3,
      diary: [],
      title_list: [],
    };
  }

  // handleChangeComplete = (color) => {
  //   this.setState({ background: color.hex });
  // };

  componentDidMount() {
    fetch('http://localhost:3003/diary/diary_date/' + this.state.full_day, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ diary: data }));
  }

  handleChangePenColor = (e) => {
    // const penColor = e.target.value;
    // this.setState({ value: e.target.value });
    // console.log('color: ', e.target.value);
    if (this.state.lineColor !== e.target.value)
      this.setState({ lineColor: e.target.value });
  };

  handleChangeBackGroundColor = (e) => {
    if (this.state.backgroundColor !== e.target.value)
      this.setState({ backgroundColor: e.target.value });
  };
  // state = {
  //   color: "#ffc600",
  //   width: "550px",
  //   height: 400,
  //   brushRadius: 10,
  //   lazyRadius: 12
  // };

  // componentDidMount() {
  //   const canvas = this.refs.canvas;
  //   const ctx = canvas.getContext("2d");
  // }
  home = () => {
    this.setState({ lineWidth: 100 });
    console.log(this.state.lineWidth);
  };

  render() {
    //A component is `contentEditable` and contains `children` managed by React.
    //오류가 나는것에 대한 처리
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

    // console.log('dsjkhfbd', this.state.value);
    const good = '/image/good.png';
    // const full_day = this.props.location.state.full_day;
    // console.log(full_day);

    //태그 한개씩 꺼내기
    const title = [];
    const sticker = [];
    this.state.diary.map((list, idx) => {
      list.title_list.forEach((tag) => {
        title.push(tag);
      });
      sticker.push(list.sticker);
    });
    console.log(this.state.diary);
    console.log(sticker[0]);
    // sticker = sticker[0];
    if (sticker[0] == 1) {
      sticker[0] = 'angry';
    } else if (sticker[0] == 2) {
      sticker[0] = 'good';
    } else if (sticker[0] == 3) {
      sticker[0] = 'sad';
    } else if (sticker[0] == 4) {
      sticker[0] = 'happy';
    } else if (sticker[0] == 5) {
      sticker[0] = 'soso';
    } else if (sticker[0] == 6) {
      sticker[0] = 'tired';
    } else if (sticker[0] == 7) {
      sticker[0] = 'what';
    } else {
      sticker[0] = 'nothing';
    }

    // let sticker = this.state.diary.sticker;
    // console.log('스티커', sticker);

    return (
      <div id="container">
        {/* {this.state.lineColor} */}
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
            <h2>{this.state.full_day}</h2>
          </div>
          <div id="writing_title">
            <h3 id="little_title">
              {title.map((title_arr, idx) => {
                return <span>#{title_arr}</span>;
              })}
            </h3>
            <div id="title_sticker">
              <img
                className="title_sticker"
                src={`/image/${sticker[0]}.png`}
                alt={`${sticker[0]}`}
                title={`${sticker[0]}`}
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
        </div>
      </div>
    );
  }
}
export default withCookies(DayDetail);
