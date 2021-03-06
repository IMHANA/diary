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
        { month: '01', emoji: 'nothing' },
        { month: '02', emoji: 'nothing' },
        { month: '03', emoji: 'nothing' },
        { month: '04', emoji: 'nothing' },
        { month: '05', emoji: 'nothing' },
        { month: '06', emoji: 'nothing' },
        { month: '07', emoji: 'nothing' },
        { month: '08', emoji: 'nothing' },
        { month: '09', emoji: 'nothing' },
        { month: '10', emoji: 'nothing' },
        { month: '11', emoji: 'nothing' },
        { month: '12', emoji: 'nothing' },
      ],
      year: [],
      this_year: new Date().getFullYear(),
      clicked_year: '',
      clicked_month: '',
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
              { month: '01', emoji: 'nothing' },
              { month: '02', emoji: 'nothing' },
              { month: '03', emoji: 'nothing' },
              { month: '04', emoji: 'nothing' },
              { month: '05', emoji: 'nothing' },
              { month: '06', emoji: 'nothing' },
              { month: '07', emoji: 'nothing' },
              { month: '08', emoji: 'nothing' },
              { month: '09', emoji: 'nothing' },
              { month: '10', emoji: 'nothing' },
              { month: '11', emoji: 'nothing' },
              { month: '12', emoji: 'nothing' },
            ],
          })
        );
    }
  }

  // 년도를 선택하면 해당하는 년도에 맞는 스티커값을 보여주기 위해서 setStatus.
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

  // 스티커나 숫자 누르면 해당 월의 일기목록으로 이동
  goDayList = (e) => {
    const mon_string = String(e.target.className.substring(0, 2));
    const year_string = String(this.state.clicked_year)
      ? '20' + String(this.state.clicked_year)
      : String(this.state.this_year);
    const mon_year = year_string + mon_string;
    this.setState({ clicked_month: mon_string });
    // console.log(mon_year);
    this.props.history.push({
      pathname: `/monthly/${mon_year}`,
      state: {
        year: year_string,
        month: mon_string,
      },
    });
  };

  render() {
    // console.log('11111   ', this.state.sticker);
    // 초기값인 realArr의 배열을 돌면서 DB에서 가져온 sticker의 값이 있으면 덮어씌운다.
    const realArr = this.state.i_num_arr.map((arr) => {
      this.state.sticker.forEach((val) => {
        let month = val.ds.substring(5, 7);
        if (arr.month === month) {
          arr.emoji = val.sticker;
        }
      });
      return arr;
    });

    // DB에 저장되어 있는 일기들을 전부 가져와서 년도만 떼고
    // set으로 중복제거한 후 sort르 정렬해서 년도를 보여준다.
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
                    title={`${arr.month} 월`}
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
