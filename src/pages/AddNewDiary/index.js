import { instanceOf } from 'prop-types';
import React, { Component } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import AddTag from '../AddTag';
import NewDay from '../NewDay';

class AddNewDiary extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    console.log('parent props: ', props);
    this.setTagState = this.setTagState.bind(this);
    this.setDiaryState = this.setDiaryState.bind(this);

    const { cookies } = props;
    this.state = {
      tag_list: [],
      clicked_sticker: 0,
      // backgroundColor: '',
      // lineWidth: 0,
      today: new Date(),
      isAddTag: true,
      backgroundColor: '#fff',
      lineColor: 'black',
      lineWidth: 3,
      drawing: '',
      text_field: '',
      // tagData: [],
      // diaryData: [],
    };
  }

  setDrawingState1 = (drawing, text_field) => {
    const { clicked_sticker, tag_list } = this.state;
    console.log('=== 요청 파람 ===');
    console.log('clicked_sticker => ', clicked_sticker);
    console.log('tag_list => ', tag_list);
    console.log('drawing => ', drawing);
    console.log('text_field => ', text_field);
    // api.요청함(tag, sticker, drawing, text_field);
    fetch('http://localhost:3003/diary/new_diary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title_list: tag_list,
        painting: drawing,
        text_field: text_field,
        sticker: clicked_sticker,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // if (json.statusCode === 200 || json.statusCode === 201) {
        alert('저장완료');
        // this.props.history.push('/monthly');
        //   } else {
        //     alert('저장실패');
        //   }
      })
      .catch((e) => alert('저장실패'));
  };

  setTagState = (tag, sticker, isTag) => {
    this.setState({
      tag_list: tag,
      clicked_sticker: sticker,
      isAddTag: false,
    });
  };

  setDrawingState = (
    backgroundColor,
    lineColor,
    lineWidth,
    drawing,
    text_field
  ) => {
    this.setState({
      backgroundColor: backgroundColor,
      lineColor: lineColor,
      lineWidth: lineWidth,
      drawing: drawing,
      text_field: text_field,
    });
  };

  setDiaryState = (backgroundColor, lineColor, lineWidth) => {
    const getColorsLines = [
      ...this.state.diaryData,
      {
        backgroundColor: backgroundColor,
        lineColor: lineColor,
        lineWidth: lineWidth,
      },
    ];
    this.setState({
      isAddTag: true,
    });
  };

  setCancel = (isAddTag) => {
    this.setState({
      isAddTag: isAddTag,
    });
  };

  render() {
    // console.log('스티커: ', this.state.clicked_sticker);
    // console.log('태그: ', this.state.tag_list);
    // console.log('배경색: ', this.state.backgroundColor);
    // console.log('lineColor: ', this.state.lineColor);
    // console.log('lineWidth: ', this.state.lineWidth);
    // console.log('drawing: ', this.state.drawing);
    // console.log('text_field: ', this.state.text_field);

    return (
      <div id="container">
        {this.state.isAddTag ? (
          <AddTag
            tag_list={this.state.tag_list}
            clicked_sticker={this.state.clicked_sticker}
            isTag={this.state.isAddTag}
            onSubmit={this.setTagState}
          />
        ) : (
          <NewDay
            onSubmit={this.setDrawingState}
            setCancel={this.setCancel}
            backgroundColor={this.state.backgroundColor}
            lineWidth={this.state.lineWidth}
            lineColor={this.state.lineColor}
            setDrawingState1={this.setDrawingState1}
            tag_list={this.state.tag_list}
            clicked_sticker={this.state.clicked_sticker}
            isAddTag={this.state.isAddTag}
          />
        )}
        {/* <h1>dd</h1>
        <NewDay onSubmit={this.setTagState} />
        <AddTag onSubmit={this.setDiaryState} /> */}
      </div>
    );
  }
}
export default withCookies(AddNewDiary);
