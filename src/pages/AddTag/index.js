import React, { Component } from 'react';
import './addTag.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import AddTagButton from './addTagButton';
import { EcoTwoTone } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

class AddTag extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  cookies = 'hi';

  constructor(props) {
    super(props);

    console.log('이게 무슨일이야 ..: ', props);

    const { cookies } = props;
    this.textRef = React.createRef();

    this.state = {
      tag_list: this.props.tag_list,
      clicked_sticker: this.props.clicked_sticker,
      isTag: this.props.isAddTad,
      addTagList: [], //계속 인풋창 생성
      test: '',
      oriTransform: '',
    };
  }

  /**
   * @title 다음 누르면 부모에게 값 전달
   */
  handleSaveButtonClick = () => {
    console.log(this.props);
    this.props.onSubmit(
      this.state.addTagList,
      this.state.clicked_sticker,
      true
    );
  };

  /**
   * @title 취소 누르면 이전 페이지로 돌아가기
   */
  goCancle = () => {
    this.props.history.goBack();
  };

  /**
   * @title 버튼 추가 처리 함수
   */
  handleAddInput = () => {
    const { addTagList: prevAddTagList } = this.state;
    const addTagList = [...prevAddTagList, ''];

    this.setState({
      addTagList,
    });
  };

  /**
   * 자식 컴포넌트인 input에서 값을 입력했을 때 입력한 값을 저장하는 함수
   * @param {*} i 타이핑 이벤트 객체
   * @param {*} index input 컴포넌트 배열 인덱스
   */
  handleChangeInput = (i) => (tag) => {
    const { addTagList: prevAddTagList } = this.state;
    console.log('tag===================', tag);
    const addTagList = prevAddTagList.map((item, index) =>
      index === i ? tag : item
    );

    this.setState({
      addTagList,
    });
  };

  /**
   * 인풋값 수정되면 state 바꿔주기
   */
  handleChangeAddTaglist = (i) => (tag) => {
    const { addTagList: prevAddTagList } = this.state;

    const addTagList = prevAddTagList.map((item, index) =>
      index === i ? tag : item
    );

    this.setState({
      addTagList,
    });
  };

  changeStickerNum = (e) => {
    console.log('eeee => ', e);
    this.setState({
      clicked_sticker: e.target.name,
    });
  };

  render() {
    console.log('render ', this.props);
    const { addTagList } = this.state;
    const addTagListElements = addTagList.map((tag, index) => {
      return (
        <AddTagButton
          key={index}
          tag={tag}
          handleChangeTagButton={this.handleChangeAddTaglist(index)}
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
    // console.log('full_day: ', full_day);

    const style = {
      display: 'block',
    };

    console.log('내가 클릭한 스티커', this.state.clicked_sticker);

    return (
      <>
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
            onClick={(e) => this.changeStickerNum(this.name)}
          />
        </div>
        <div id="btnbox">
          <span id="cancle_btn" onClick={this.goCancle}>
            취소
          </span>
          <span id="next_btn" onClick={this.handleSaveButtonClick}>
            다음
          </span>
        </div>
      </>
    );
  }
}
export default withRouter(AddTag);
// export default AddTag;
