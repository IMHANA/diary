import { instanceOf } from 'prop-types';
import React, { Component } from 'react';
import { Cookies, withCookies } from 'react-cookie';

class addNewDiary extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {};
  }
  render() {
    return <div></div>;
  }
}
export default withCookies(addNewDiary);
