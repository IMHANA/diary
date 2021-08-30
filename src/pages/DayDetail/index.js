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
import FileBase64 from 'react-file-base64';

const WriteBoard = memo(({ onChange }) => {
  return (
    <textarea
      className="writing-board"
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
      backgroundColor: '',
      lineColor: '',
      lineWidth: '',
      full_day: this.props.location.state.full_day,
      diary: {},
      diary_no: this.props.location.state.diary_no,
      isEdit: true,
      edited_title_list: [],
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
        this.setState({
          diary: data,
          sticker: sticker,
        });
      });
  }

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

    console.log('this.state.diary.title_list : ', this.state.diary.title_list);
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
                <img
                  src={`${this.state.diary.painting}`}
                  alt={'dd'}
                  style={
                    { backgroundColor: 'white' }
                      ? { backgroundColor: 'transparent' }
                      : { backgroundColor: 'white' }
                  }
                ></img>

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
                </h3>
                <div id="title_sticker">
                  {/* <img
                className="title_sticker"
                src={`/image/${clicked_sticker}.png`}
                alt={`${clicked_sticker}`}
                title={`${clicked_sticker}`}
              /> */}
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
                  <WriteBoard onChange={this.write_area} />
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
                  onClick={this.handleButtonClick}
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
