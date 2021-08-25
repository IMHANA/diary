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
    const year = String(new Date.getFullYear());
    const month = String(new Date.getMonth());
    const date = String(new Date.getDay());
    const full_date = String(year + month + date);
    console.log(full_date);

    return (
      <div id="container">
        <div id="write_date">20210803</div>
        <div className="inputBox">
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
        </div>
        <div>
          <ChildCare className="icon" />
          <DirectionsBoat className="icon" />
          <ChildCare className="icon" />
          <DirectionsBoat className="icon" />
          <ChildCare className="icon" />
          <DirectionsBoat className="icon" />
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
