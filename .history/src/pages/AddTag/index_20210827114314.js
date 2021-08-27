import React, { Component } from 'react';
import './addTag.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ChildCare, DirectionsBoat } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import AddTagButton from './addTagButton';

class AddTag extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    // this.textRef = React.createRef();

    this.state = {
      tag_list: this.props.tag_list,
      clicked_sticker: this.props.clicked_sticker,
      isTag: this.props.isAddTad,
      addTagList: [], //계속 인풋창 생성
      test: '',
    };
  }
  // componentDidMount() {
  //   console.log(this.textRef.current.state);
  //   this.textRef.current.focusTextInput();
  // }

  goCancle = () => {
    this.props.history.goBack();
  };

  handleButtonClick = () => {
    // const { tag_list, clicked_sticker } = this.state;
    // this.props.setTagState.bind(this);
    this.props.onSubmit({
      tag: this.state.tag_list,
      sticker: this.state.clicked_sticker,
      isTag: false,
    });
    // this.props.setTagState(this.state);

    //모든 인풋창 돌면서 []에 input의 value를 전부 push하고싶다 !!!!!
  };

  /**
   * @title 버튼 추가 처리 함수
   */
  handleAddInput = () => {
    const { addTagList } = this.state;
    const newAddTagList = [
      ...addTagList,
      {
        tag: '',
      },
    ];

    this.setState({
      addTagList: newAddTagList,
    });
  };

  /**
   * 자식 컴포넌트인 input에서 값을 입력했을 때 처리하는 함수
   * @param {*} e 타이핑 이벤트 객체
   * @param {*} index input 컴포넌트 배열 인덱스
   */
  handleChangeInput = (e, index) => {
    console.log(`${index} event: `, e.target.value);
  };

  stickerNum = (e) => {
    this.setState({
      clicked_sticker: e.target.value,
    });
    console.log(this.state.clicked_sticker);
  };

  test = (e) => {
    this.setState({
      test: e.target.value,
    });
    console.log('test:', this.state.test);

    // setTimeout(() => {
    //   this.setState((prevState) => ({
    //     tag_list: [...prevState.tag_list, test],
    //   }));
    // }, 2000);
  };

  render() {
    const { addTagList } = this.state;
    const addTagListElements = addTagList.map((tag, index) => {
      return (
        <AddTagButton
          key={`${index}-${tag}`}
          index={index}
          handleChangeInput={this.handleChangeInput}
          // ref={this.textRef}
        />
      );
    });

    let today = new Date();
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
    console.log('full_day: ', full_day);

    const style = {
      display: 'inline-block',
    };

    return (
      <div id="container">
        <div id="write_date">{full_day}</div>
        <div className="inputBox" style={style}>
          <div>
            {/* <AddTagButton /> */}
            <button onClick={this.handleAddInput}>제목태그 추가</button>
          </div>
          <div>{addTagListElements}</div>
        </div>
        <div>
          <img
            className="addlist_sticker"
            src="/image/angry.png"
            alt="분노의말랭이"
            value="1"
            onClick={this.stickerNum}
          />
          <img
            className="addlist_sticker"
            src="/image/good.png"
            alt="좋음의말랭이"
            value="2"
          />
          <img
            className="addlist_sticker"
            src="/image/sad.png"
            alt="슬픔의말랭이"
            value="3"
          />
          <img
            className="addlist_sticker"
            src="/image/happy.png"
            alt="행복의말랭이"
            value="4"
          />
          <img
            className="addlist_sticker"
            src="/image/soso.png"
            alt="그저그런말랭이"
            value="5"
          />
          <img
            className="addlist_sticker"
            src="/image/tired.png"
            alt="지친말랭이"
            value="6"
          />
          <img
            className="addlist_sticker"
            src="/image/what.png"
            alt="에엥의말랭이"
            value="7"
          />
          {/* <ChildCare className="icon" />
          <DirectionsBoat className="icon" />
          <ChildCare className="icon" />
          <DirectionsBoat className="icon" />
          <ChildCare className="icon" />
          <DirectionsBoat className="icon" /> */}
        </div>
        <div id="btnbox">
          <span id="cancle_btn" onClick={this.goCancle}>
            취소
          </span>
          <span id="next_btn" onClick={this.handleButtonClick}>
            다음
          </span>
        </div>
      </div>
    );
  }
}
export default withCookies(AddTag);
