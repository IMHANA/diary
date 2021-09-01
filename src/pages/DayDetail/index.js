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
import { withRouter } from 'react-router-dom';

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

  // isEdit가 삼항연산자로 되어있기 때문에 렌더되지 않은 상태의 painting은 가져오지 못한다.
  // 만약 수정하기 버튼을 누르기 이전과 isEdit의 true, false 값이 변경되면 painting을 fromJSON형태로 변환하는 작업을 해야
  // 제대로 인코딩된다. 이 작업없으면 계속 오류남
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isEdit !== prevState.isEdit) {
      this._sketch.current.fromJSON(this.state.diary.painting);
    }
  }

  //펜컬러색 계속 state변경
  handleChangePenColor = (e) => {
    if (this.state.lineColor !== e.target.value)
      this.setState({ lineColor: e.target.value });
  };

  //배경색 변경시 state바꿔주기
  handleChangeBackGroundColor = (e) => {
    if (this.state.backgroundColor !== e.target.value)
      this.setState({ backgroundColor: e.target.value });
  };

  //배경색 없애주기
  handleChangeBackToNone = () => {
    this.setState({ backgroundColor: 'transparent' });
  };

  //무시 (test)
  home = () => {
    this.setState({ lineWidth: 100 });
    console.log(this.state.lineWidth);
  };

  //일기 수정하기 누르면 수정하기 화면으로 바꿔주고 title_list(빈배열)에 있던 태그값 넘겨주기
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

  //
  saveDiary = () => {
    this.setState({
      isEdit: true,
    });
  };

  handleButtonClick = () => {
    this.setState({ backgroundColor: 'transparent' });
  };

  //수정버튼 클릭하면 이벤트처리
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
    })
      .then((response) => response.json())
      .then((json) => {
        alert('수정완료');
        //수정후 그 달의 리스트로 가기
        this.props.history.push({
          pathname: `/monthly/${this.state.full_day.substring(4, 6)}`,
          state: {
            year: this.state.full_day.substring(0, 4),
            month: this.state.full_day.substring(4, 6),
          },
        });
      })
      .catch((e) => alert('수정 실패', e));
  };

  //일기그림 수정하면 setState
  _onSketchChange = (e) => {
    // this._sketch.current.fromJSON(
    //   JSON.stringify(this._sketch.current.toJSON())
    // );
    console.log('e => ', e);
    // this._sketch.fromJSON(e);
    // console.log(e);
  };

  // 태그 변경되면 state 바꿔주기
  handleAddInput = () => {
    const { edited_title_list } = this.state;

    this.setState({
      edited_title_list: [...edited_title_list, ''],
    });
  };

  //스티커 클릭하면 클릭된 스티커 번호 state변경
  changeStickerNum = (e) => {
    console.log('eeee => ', e);
    this.setState({
      clicked_sticker: e.target.name,
    });
  };

  //일기쓰면 state 변경
  write_area = (e) => {
    console.log('e => ', e);
    this.setState({
      text_field: e.target.value,
    });
  };

  // +버튼 누르면 일기 추가페이지로 이동
  goAddDiary = () => {
    this.props.history.push({
      pathname: `/addNewDiary`,
    });
  };

  // 취소 누르면 이전 페이지로 돌아가기
  goCancle = () => {
    this.props.history.goBack();
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
    console.log('searched: ', this.state.searched);
    // console.log('full_day: ', this.state.full_day.substring(4, 6));
    return (
      <div id="container">
        {this.state.isEdit ? (
          <>
            <div style={{ width: '75%', height: '5%' }} id="mid_container">
              <div id="list_container">
                <Add style={{ fontSize: '45px' }} onClick={this.goAddDiary} />
                <ArrowBack
                  style={{ fontSize: '45px' }}
                  onClick={this.goCancle}
                />
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
                  {this.state.diary.text_field}
                  {/* {this.state.diary.text_field?.split('\n').map((line) => {
                    return line;
                  })} */}
                </div>
              </div>
              <div id="edit_btn">
                <button onClick={this.editDiary}>일기수정</button>
              </div>
            </div>
          </>
        ) : (
          // =============================일기수정===============================================
          <>
            <div style={{ width: '75%', height: '5%' }} id="mid_container">
              <div id="list_container">
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
              <div id="writing_title2">
                <h3 id="little_title">
                  {this.state.edited_title_list
                    ? this.state.edited_title_list.map((title_arr, idx) => {
                        return (
                          <div className="editInputBox">
                            <input
                              className="editInput"
                              key={idx}
                              value={title_arr}
                              onChange={(e) => this.editTitleList(e, idx)}
                            />
                            {/* {title_arr} */}
                            {/* </input> */}
                          </div>
                        );
                      })
                    : null}
                  {/* <AddTagButton /> */}
                </h3>
                <div>
                  <button onClick={() => this.handleAddInput('hana')}>
                    태그추가
                  </button>
                </div>
              </div>
              <div id="title_sticker">
                <div id="title_sticker2">
                  <img
                    className="addlist_sticker2"
                    src="/image/angry.png"
                    alt="분노의말랭이"
                    name="1"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker2"
                    src="/image/good.png"
                    alt="좋음의말랭이"
                    name="2"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker2"
                    src="/image/sad.png"
                    alt="슬픔의말랭이"
                    name="3"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker2"
                    src="/image/happy.png"
                    alt="행복의말랭이"
                    name="4"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker2"
                    src="/image/soso.png"
                    alt="그저그런말랭이"
                    name="5"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker2"
                    src="/image/tired.png"
                    alt="지친말랭이"
                    name="6"
                    onClick={this.changeStickerNum}
                  />
                  <img
                    className="addlist_sticker2"
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
export default withRouter(DayDetail);
