import React, { Component } from 'react';
import './month.css';
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
      clicked_year: '',
    };
  }

  componentDidMount() {
    //전체일기 조회
    fetch('http://localhost:3003/diary/list', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ year: data }));

    //일기 년도별 조회
    fetch('http://localhost:3003/diary/diary_year/' + this.state.this_year, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ montly: data }));

    //월별 스티커 조회
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.clicked_year !== prevState.clicked_year) {
      fetch(
        'http://localhost:3003/diary/montly_sticker/20' +
          this.state.clicked_year,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            sticker: data,
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
          })
        );
    }
  }

  changeYear = (e) => {
    console.log('e: ', e);
    const ori_year = this.state.year.map((val) => {
      return String(val.diary_date);
    });
    // console.log('ori_year: ', ori_year);
    let clicked_year = '';
    ori_year.forEach((ori_arr) => {
      if (e === String(ori_arr.substring(2, 4))) {
        // console.log(String(ori_arr.substring(2, 4)));
        clicked_year = String(ori_arr.substring(2, 4));
      }
    });
    console.log('clicked ~~ ', clicked_year);
    // fetch 여기서 해준다.
    this.setState({
      clicked_year: clicked_year,
    });
  };

  goDayList = (e) => {
    // for (let i = 1; Number(e.target.className) > 2; i++) {
    //   console.log(e.target.className[0], e.target.className[1]);
    //   i++;
    // }
    const arr = Array.from(e.target.className).forEach((arr) => {
      // console.log('휴..', e.target.className);
      let num_month = Number(arr[0]);

      // if (num_month.typeof(Number)) {
      //   console.log(num_month);
      // }
      // console.log('휴..', Number(arr[0]));
    });
  };

  render() {
    console.log('11111   ', this.state.sticker);
    const realArr = this.state.i_num_arr.map((arr) => {
      this.state.sticker.forEach((val) => {
        let month = val.ds.substring(5, 7);

        if (arr.month === month) {
          arr.emoji = val.sticker;
        }
      });
      return arr;
    });

    const only_year = this.state.year.map((val) => {
      return String(val.diary_date).substring(2, 4);
    });
    // console.log(only_year); //모든 일기의 년도
    const set = Array.from(new Set(only_year));
    set.sort();

    return (
      <div id="container">
        <div className="month_box_container first-floor">
          {realArr.map((arr, idx) => {
            return (
              <div key={idx} className="calendar-item">
                <span className={`${arr.month} title`} onClick={this.goDayList}>
                  {arr.month}
                </span>
                <div>
                  <img
                    className={`${arr.month} sticker`}
                    src={`/image/${arr.emoji}.png`}
                    alt="이미지 설명"
                    title="마우스 오버 시 나오는 설명"
                    onClick={this.goDayList}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div id="year_row">
          {set.map((arr, idx) => {
            return (
              <span
                key={idx}
                className="year_num"
                onClick={() => this.changeYear(arr)}
              >
                {arr}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withCookies(Month);
