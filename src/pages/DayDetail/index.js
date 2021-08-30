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
import './dayDetail.css';
import { fabric } from 'fabric';
import AddTagButton from '../AddTag/addTagButton';

const WriteBoard = memo(({ onChange, value }) => {
  return (
    <textarea
      className="writing-board"
      value={value}
      contentEditable={true}
      onChange={onChange}
    />
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
      backgroundColor: '#fff',
      lineColor: 'black',
      lineWidth: '3',
      full_day: this.props.location.state.full_day,
      diary: {},
      diary_no: this.props.location.state.diary_no,
      isEdit: true,
      edited_title_list: [],
      addTagList: [], //인풋창 생성
      clicked_sticker: 8,
      text_field: '',
    };
    this._sketch = React.createRef();
  }

  componentDidMount() {
    fetch('http://localhost:3003/diary/diary_no/' + this.state.diary_no, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data);
        let sticker = '';
        if (data.sticker === 1) {
          sticker = 'angry';
        } else if (data.sticker === 2) {
          sticker = 'good';
        } else if (data.sticker === 3) {
          sticker = 'sad';
        } else if (data.sticker === 4) {
          sticker = 'happy';
        } else if (data.sticker === 5) {
          sticker = 'soso';
        } else if (data.sticker === 6) {
          sticker = 'tired';
        } else if (data.sticker === 7) {
          sticker = 'what';
        } else {
          sticker = 'nothing';
        }
        console.log('ssssss', this._sketch.current);
        this._sketch.current.fromJSON(data.painting);
        this.setState({
          diary: data,
          sticker: sticker,
          text_field: data.text_field,
          clicked_sticker: data.sticker,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isEdit !== prevState.isEdit) {
      this._sketch.current.fromJSON(this.state.diary.painting);
    }
  }

  handleChangePenColor = (e) => {
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

  home = () => {
    this.setState({ lineWidth: 100 });
    console.log(this.state.lineWidth);
  };

  editDiary = () => {
    // fetch('http://localhost:3003/diary/' + this.state.diary_no, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     title_list: this.state.diary.title_list,
    //     painting: this.state.diary.painting,
    //     text_field: this.state.diary.field,
    //     sticker: this.state.diary.sticker,
    //   }),
    // })
    this.setState({
      isEdit: false,
      edited_title_list: this.state.diary.title_list,
    });
  };

  // 태그값 수정되면 기존 title_list 대신 edited_title_list에 값 저장
  editTitleList = (e, idx) => {
    let arr = this.state.edited_title_list;
    arr[idx] = e.target.value;
    this.setState({
      edited_title_list: arr,
    });
  };

  saveDiary = () => {
    this.setState({
      isEdit: true,
    });
  };

  handleButtonClick = () => {
    this.setState({ backgroundColor: 'transparent' });
  };

  handleEditButtonClick = () => {
    fetch('http://localhost:3003/diary/' + this.state.diary_no, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        diary_no: this.state.diary_no,
        title_list: this.state.edited_title_list,
        painting: JSON.stringify(this._sketch.current.toJSON()),
        text_field: this.state.text_field,
        sticker: this.state.clicked_sticker,
        diary_date: this.state.diary.diary_date,
      }),
    });
  };

  _onSketchChange = (e) => {
    // this._sketch.current.fromJSON(
    //   JSON.stringify(this._sketch.current.toJSON())
    // );
    console.log('e => ', e);
    // this._sketch.fromJSON(e);
    // console.log(e);
  };

  handleAddInput = () => {
    const { edited_title_list } = this.state;

    this.setState({
      edited_title_list: [...edited_title_list, ''],
    });
  };

  changeStickerNum = (e) => {
    console.log('eeee => ', e);
    this.setState({
      clicked_sticker: e.target.name,
    });
  };

  write_area = (e) => {
    console.log('e => ', e);
    this.setState({
      text_field: e.target.value,
    });
  };

  /**
   * Add an image as object to the canvas
   *
   * @param dataUrl the image url or Data Url
   * @param options object to pass and change some options when loading image, the format of the object is:
   *
   * {
   *   left: <Number: distance from left of canvas>,
   *   top: <Number: distance from top of canvas>,
   *   scale: <Number: initial scale of image>
   * }
   */

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
    // let test = JSON.parse(this.state.diary.painting);

    console.log('this.state.diary.title_list : ', this.state.diary.title_list);
    console.log('edited_title_list: ', this.state.edited_title_list);
    console.log('clicked_sticker: ', this.state.clicked_sticker);
    console.log('text_field: ', this.state.text_field);
    return (
      <div id="container">
        {this.state.isEdit ? (
          <>
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
                  {this.state.diary.title_list
                    ? this.state.diary.title_list.map((title_arr, idx) => {
                        return <span>#{title_arr}</span>;
                      })
                    : null}
                </h3>
                <div id="title_sticker">
                  <img
                    className="title_sticker"
                    src={`/image/${this.state.sticker}.png`}
                    alt={`${this.state.sticker}`}
                    title={`${this.state.sticker}`}
                  />
                </div>
              </div>
              <div id="writing_container">
                <SketchField
                  ref={this._sketch}
                  // imageFormat={`${test}`}
                  width={550}
                  height={400}
                  tool={Tools.Pencil}
                  lineColor={this.state.lineColor}
                  lineWidth={this.state.lineWidth}
                  backgroundColor={this.state.backgroundColor}
                  // onChange={this._onSketchChange}
                />
                {/* <img
                  src={`${this.state.diary.painting}`.fromJSON()}
                  alt={'dd'}
                  style={
                    { backgroundColor: 'white' }
                      ? { backgroundColor: 'transparent' }
                      : { backgroundColor: 'white' }
                  }
                ></img> */}

                <div style={{ display: 'none' }}></div>

                <div className="write_area for_space">
                  <span className="for_space">
                    {this.state.diary.text_field}
                  </span>
                </div>
              </div>
              <div id="edit_btn">
                <button onClick={this.editDiary}>일기수정</button>
              </div>
            </div>
          </>
        ) : (
          // ============================================================================
          <>
            <div style={{ width: '75%', height: '5%' }} id="mid_container">
              <div id="list_container">
                <TextField
                  id="menu_box"
                  label="일기찾기"
                  color="secondary"
                  style={{ width: '80px' }}
                />
                <Add style={{ fontSize: '45px' }} />
                <ArrowBack
                  style={{ fontSize: '45px' }}
                  onClick={this.goCancel}
                />
              </div>
            </div>
            <div>
              <div id="writing_date">
                <h2>{this.state.full_day}</h2>
              </div>
              <div id="writing_title">
                <h3 id="little_title">
                  {this.state.edited_title_list
                    ? this.state.edited_title_list.map((title_arr, idx) => {
                        return (
                          <input
                            key={idx}
                            value={title_arr}
                            onChange={(e) => this.editTitleList(e, idx)}
                          ></input>
                        );
                      })
                    : null}
                  {/* <AddTagButton /> */}
                  <button onClick={() => this.handleAddInput('hana')}>
                    태그추가
                  </button>
                </h3>
              </div>
              <div id="title_sticker">
                <div>
                  <img
                    className="addlist_sticker"
                    src="/image/angry.png"
                    alt="분노의말랭이"
                    name="1"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker"
                    src="/image/good.png"
                    alt="좋음의말랭이"
                    name="2"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker"
                    src="/image/sad.png"
                    alt="슬픔의말랭이"
                    name="3"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker"
                    src="/image/happy.png"
                    alt="행복의말랭이"
                    name="4"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker"
                    src="/image/soso.png"
                    alt="그저그런말랭이"
                    name="5"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker"
                    src="/image/tired.png"
                    alt="지친말랭이"
                    name="6"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker"
                    src="/image/what.png"
                    alt="에엥의말랭이"
                    name="7"
                    onClick={this.changeStickerNum}
                  />
                </div>
              </div>
              <div id="writing_container">
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

                <div className="write_area">
                  <WriteBoard
                    onChange={this.write_area}
                    value={this.state.text_field}
                  />
                </div>
              </div>
              <div>
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
                <IconButton
                  cols="20"
                  rows="10"
                  aria-label="delete"
                  id="cancle_btn"
                >
                  <Delete />
                </IconButton>
                <IconButton
                  aria-label="save"
                  id="save_btn"
                  onClick={this.handleEditButtonClick}
                >
                  <SaveAlt />
                </IconButton>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default withCookies(DayDetail);
