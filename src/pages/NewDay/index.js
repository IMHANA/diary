import React, { Component, createRef, memo } from 'react';
import { Add, ArrowBack, Flag, ExpandMore, Minimize } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import './newDay.css';
import IconButton from '@material-ui/core/IconButton';
import { Delete, SaveAlt } from '@material-ui/icons';
// import CanvasDraw from "react-canvas-draw";
import { SketchField, Tools } from '../../components/customSketchField';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import DayDetail from '../DayDetail';
// import { SketchPicker } from 'react-color';

const WriteBoard = memo(({ onChange }) => {
  return (
    <textarea
      className="writing-board"
      contentEditable={true}
      onChange={onChange}
    />
  );
});
class NewDay extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      backgroundColor: this.props.backgroundColor,
      lineColor: this.props.lineColor,
      lineWidth: this.props.lineWidth,
      drawing: this.props.drawing,
      text_field: this.props.text_field,
      tag_list: this.props.tag_list,
      clicked_sticker: this.props.clicked_sticker,
      isAddTag: this.props.clicked_sticker,
      // backgroundColor: '#fff',
      // lineColor: 'black',
      // lineWidth: 3,
      // today: new Date(),
      // drawing: '',
      // text_field: '',
    };
    this._sketch = React.createRef();
    //부모 컴포넌트에서 자식 컴포넌트에 접근하고 싶을 때 사용
  }

  // 저장 누르면 부모에게 값 전달
  handleSaveButtonClick = () => {
    console.log(this.props);
    this.props.onsubmit(
      this.state.backgroundColor,
      this.state.lineColor,
      this.state.lineWidth,
      this.state.drawing,
      this.state.text_field,
      this.state.isAddTag
    );
  };

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

  handleChangeBackToNone = () => {
    this.setState({ backgroundColor: 'transparent' });
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

  //save버튼 누르면 부모컴포넌트에 값 전달
  handleButtonClick = () => {
    console.log('=== 클릭 ===');
    console.log('this.props => ', this.props);
    this.props.setDrawingState1(
      this._sketch.current.toDataURL(),
      this.state.text_field
    );

    // console.log(this._sketch.current.addImg());
    // this.props.setDiaryState();
  };

  write_area = (e) => {
    console.log('e => ', e);
    this.setState({
      text_field: e.target.value,
    });
  };

  /**
   * @title 취소 누르면 이전 페이지로 돌아가기
   */
  goCancel = () => {
    this.props.setCancel(true);
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

    console.log(this.state.text_field);

    //오늘날짜
    const today = new Date();
    let year = String(today.getFullYear());
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());

    if (month.length < 2) {
      month = String('0' + month);
    }
    if (day.length < 2) {
      day = String('0' + day);
    }
    let full_day = year + month + day;

    let { clicked_sticker } = this.state;
    console.log('clicked_sticker=====', clicked_sticker);
    if (clicked_sticker == 1) {
      clicked_sticker = 'angry';
    } else if (clicked_sticker == 2) {
      clicked_sticker = 'good';
    } else if (clicked_sticker == 3) {
      clicked_sticker = 'sad';
    } else if (clicked_sticker == 4) {
      clicked_sticker = 'happy';
    } else if (clicked_sticker == 5) {
      clicked_sticker = 'soso';
    } else if (clicked_sticker == 6) {
      clicked_sticker = 'tired';
    } else if (clicked_sticker == 7) {
      clicked_sticker = 'what';
    } else {
      clicked_sticker = 'nothing';
    }
    console.log('clicked_sticker=====', clicked_sticker);

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
            <ArrowBack style={{ fontSize: '45px' }} onClick={this.goCancel} />
          </div>
        </div>
        <div>
          <div id="writing_date">
            <h2>{full_day}</h2>
          </div>
          <div id="writing_title">
            <h3 id="little_title">
              {this.state.tag_list.map((tag, index) => {
                return <span key={index}>#{tag}</span>;
              })}
            </h3>
            <div id="title_sticker">
              <img
                className="title_sticker"
                src={`/image/${clicked_sticker}.png`}
                alt={`${clicked_sticker}`}
                title={`${clicked_sticker}`}
              />
            </div>
          </div>
          <div id="writing_container">
            {/* <div id='paint_area'></div> */}
            {/* <CanvasDraw brushColor="rgba(155,12,60,0.3)" onChange={() => console.log("onChange")} /> */}
            <SketchField
              ref={this._sketch}
              width={550}
              height={400}
              tool={Tools.Pencil}
              lineColor={this.state.lineColor}
              lineWidth={this.state.lineWidth}
              backgroundColor={this.state.backgroundColor}
              onChange={this._onSketchChange}
            />

            <div style={{ display: 'none' }}></div>
            {/* <TextField onKeyDown="if(event.keyCode===13) {let v=this.value, s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}" id="write_area" style={{whiteSpace: "pre-line;"}}></TextField> */}

            <div className="write_area">
              {/* <textarea className="writing-board"></textarea> */}
              <WriteBoard onChange={this.write_area} />
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
            <button onClick={this.handleChangeBackToNone}>투명</button>
          </div>
          <div id="btn_container">
            {/*버튼 누르면 브러시 두께 바뀌는거. 다듬어서 옵션으로 만들것 */}
            {/* <button onClick={this.home}>156165</button> */}
            <IconButton cols="20" rows="10" aria-label="delete" id="cancle_btn">
              <Delete />
            </IconButton>
            <IconButton
              aria-label="save"
              id="save_btn"
              onClick={this.handleButtonClick}
            >
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
export default withCookies(NewDay);
