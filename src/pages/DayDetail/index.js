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
      full_day: this.props.location.state.full_day,
      diary: {},
      diary_no: this.props.location.state.diary_no,
      isEdit: true,
    };
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
    this.setState({
      isEdit: false,
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
                <button onClick={this.saveDiary}>수정다되따 !!!</button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default withCookies(DayDetail);
