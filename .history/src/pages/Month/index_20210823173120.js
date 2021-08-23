import React, { Component } from 'react';
import './month.css';
import {
  EmojiEmotions,
  FilterVintage,
  Spa,
  WbCloudy,
  MoodBad,
} from '@material-ui/icons';
import { sizeHeight } from '@material-ui/system';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
class Month extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      user_id: cookies.get('user_id'),
      montly: '',
      sticker: [],
      i_num_arr: [
        { month: '01', emoji: 'soso' },
        { month: '02', emoji: 'soso' },
        { month: '03', emoji: 'soso' },
        { month: '04', emoji: 'soso' },
        { month: '05', emoji: 'soso' },
        { month: '06', emoji: 'soso' },
        { month: '07', emoji: 'soso' },
        { month: '08', emoji: 'soso' },
        { month: '09', emoji: 'soso' },
        { month: '10', emoji: 'soso' },
        { month: '11', emoji: 'soso' },
        { month: '12', emoji: 'soso' },
      ],
      year: [],
      this_year: new Date().getFullYear(),
    };
  }

  componentDidMount() {
    fetch('http://localhost:3003/diary/list', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ year: data }));

    fetch('http://localhost:3003/diary/diary_year/' + this.state.this_year, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ montly: data }));

    fetch(
      'http://localhost:3003/diary/montly_sticker/' + this.state.this_year,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((data) => this.setState({ sticker: data }));
  }

  render() {
    // const { user_id } = this.state;
    // console.log('잘 오나...', user_id);
    // console.log(this.state.montly);

    const realArr = this.state.i_num_arr.map((arr) => {
      this.state.sticker.forEach((val) => {
        const month = val.ds.substring(5, 7);

        if (arr.month === month) {
          arr.emoji = val.sticker;
        }
      });
      return arr;
    });
    // console.log('realArr', realArr);
    // console.log('ㅇ', this.state.year);
    const only_year = this.state.year.map((val) => {
      return String(val.diary_date).substring(2, 4);
    });
    const ori_year = this.state.year.map((val) => {
      return String(val.diary_date).substring(0, 4);
    });
    // console.log(only_year);
    const set = Array.from(new Set(only_year));
    set.sort();
    // this.setState({
    //   this_year: new Date().toString,
    // });
    const yyy = new Date();
    console.log('올해 ', yyy.getFullYear());

    return (
      <div id="container">
        <div className="month_box_container first-floor">
          {realArr.map((arr) => {
            return (
              <div className="calendar-item">
                <span className="title">{arr.month}</span>
                <div>
                  <img
                    className="sticker"
                    src={`/image/${arr.emoji}.png`}
                    alt="이미지 설명"
                    title="마우스 오버 시 나오는 설명"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div id="year_row">
          {set.map((arr) => {
            return <span className="year_num">{arr}</span>;
          })}
        </div>
      </div>
    );
  }
}

export default withCookies(Month);
