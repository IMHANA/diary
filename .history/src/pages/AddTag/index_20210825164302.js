import React, { Component } from 'react';
import './addTag.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ChildCare, DirectionsBoat } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class AddTag extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      tag_list: [],
      clicked_sticker: 0,
    };
  }
  render() {
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

    return (
      <div id="container">
        <div id="write_date">{full_day}</div>
        <div className="inputBox">
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
        </div>
        <div>
          <img
            className="list_sticker"
            src="/image/angry.png"
            alt="분노의말랭이"
            value="1"
          />
          <img
            className="list_sticker"
            src="/image/good.png"
            alt="좋음의말랭이"
            value="2"
          />
          <img
            className="list_sticker"
            src="/image/sad.png"
            alt="슬픔의말랭이"
            value="3"
          />
          <img
            className="list_sticker"
            src="/image/happy.png"
            alt="행복의말랭이"
            value="4"
          />
          <img
            className="list_sticker"
            src="/image/soso.png"
            alt="그저그런말랭이"
            value="5"
          />
          <img
            className="list_sticker"
            src="/image/tired.png"
            alt="지친말랭이"
            value="6"
          />
          <img
            className="list_sticker"
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
          <span id="cancle_btn">취소</span>
          <span id="next_btn">다음</span>
        </div>
      </div>
    );
  }
}
export default withCookies(AddTag);
