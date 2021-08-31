import React, { Component } from 'react';
import { Add, ArrowBack, Flag, ExpandMore, Minimize } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import './dayList.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class DayList extends Component {
  static propsTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      month: '',
      year: '',
      d_count: '',
      diary: [],
      searched: [],
      isSearched: true,
    };
  }

  componentDidMount() {
    const month = this.props.location.state.month;
    const year = this.props.location.state.year;
    const mon_year = year + month;
    this.setState({
      month: month,
      year: year,
    });
    fetch('http://localhost:3003/diary/diary_month/' + mon_year, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ diary: data }));
  }

  //로우 선택하면 해당 일기 상세로 이동
  goDayDetail = (e, diary_no) => {
    console.log(e);
    const day = String(e.substring(0, 10));
    const full_day = day.replace(/\-/g, '');
    const day_string = String(e.substring(8, 10));
    console.log('day_string: ', day_string);
    this.props.history.push({
      pathname: `/monthly/month/${diary_no}`,
      state: {
        full_day: full_day,
        diary_no: diary_no,
      },
    });
  };

  // +버튼 누르면 일기 추가페이지로 이동
  goAddDiary = () => {
    this.props.history.push({
      pathname: `/addNewDiary`,
      state: {
        prev_year: this.state.year,
        prev_month: this.state.month,
      },
    });
  };

  /**
   * @title 취소 누르면 이전 페이지로 돌아가기
   */
  goCancle = () => {
    this.props.history.push({
      pathname: `/monthly`,
      state: {
        prev_year: this.state.year,
        prev_month: this.state.month,
      },
    });
  };

  //해시태그로 일기 찾기
  searchTag = (e) => {
    // console.log('여기가 해시태그다 !!!!', String(e.target.value));
    // console.log('드루와', this.state.year, this.state.month);
    e.preventDefault();

    let val = e.target.value;
    let pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    if (pattern.test(val)) {
      alert('특수문자 입력 불가');
      e.target.value = val.replace(pattern, '');
    } else {
      console.log('e.target.value : ', e.target.value);

      if (e.key === 'Enter') {
        // console.log('enter 들어왔니?');

        console.log(
          this.state.year + this.state.month + '/' + String(e.target.value)
        );
        console.log('value: ', e.target.value);
        fetch(
          'http://localhost:3003/diary/search_hash/' +
            this.state.year +
            this.state.month +
            '/' +
            String(e.target.value),
          {
            method: 'GET',
            credentials: 'include',
          }
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ searched: data });
            if (data) {
              this.setState({
                isSearched: false,
              });
            }
          });
      }
      console.log(this.state.searched);
    }
  };

  render() {
    console.log(this.state.diary);
    console.log('searched: ', this.state.searched);
    if (this.state.searched == '' && this.state.searched == 'null') {
      this.setState({ isSearched: false });
    }
    return (
      <div id="container">
        <div id="sub_box">
          {/* <div className='list_title'>
                        <span id='month'>08</span><span id='month_sub'>월의 일기 8개</span>
                        <TextField id="standard-secondary" label="태그찾기" color="secondary" style={{width: '80px'}} />
                        <Add style={{fontSize: '45px'}}/>
                        <ArrowBack style={{fontSize: '45px'}} />
                    </div> */}
          <div id="list_title">
            <div className="list-con">
              <span id="month">{this.state.month}</span>
              <span id="month_sub">월의 일기 {this.state.diary.length}개</span>
            </div>
            <div className="list-con2">
              <span>
                <TextField
                  id="standard-secondary"
                  label="일기찾기"
                  color="secondary"
                  style={{ width: '80px' }}
                  onKeyDown={this.searchTag}
                />
              </span>
              <span onClick={this.goAddDiary}>
                <Add style={{ fontSize: '45px' }} />
              </span>
              <span>
                <ArrowBack
                  style={{ fontSize: '45px' }}
                  onClick={this.goCancle}
                />
              </span>
            </div>
          </div>
          {/* <div id="month_list"> */}
          {this.state.isSearched ? (
            <div className="list_box">
              {this.state.diary.map((arr, idx) => {
                return (
                  <div
                    className={`${arr.diary_date} date_box`}
                    onClick={(e) =>
                      this.goDayDetail(arr.diary_date, arr.diary_no)
                    }
                  >
                    <span className="date">
                      <Minimize /> {String(arr.diary_date).substring(5, 10)}
                    </span>
                    <img
                      className="list_sticker"
                      src={`/image/${arr.sticker}.png`}
                      alt="말랭이"
                    />
                    {arr.title_list.map((title_arr, idx) => {
                      return (
                        <span className="list_box_span"> #{title_arr}</span>
                      );
                    })}
                    {/* <span className="list_box_span">{arr.title_list}</span> */}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="list_box">
              {this.state.searched.map((arr, idx) => {
                return (
                  <div
                    className={`${arr.diary_date} date_box`}
                    onClick={(e) =>
                      this.goDayDetail(arr.diary_date, arr.diary_no)
                    }
                  >
                    <span className="date">
                      <Minimize /> {String(arr.diary_date).substring(5, 10)}
                    </span>
                    <img
                      className="list_sticker"
                      src={`/image/${arr.sticker}.png`}
                      alt="말랭이"
                    />
                    {arr.title_list.map((title_arr, idx) => {
                      return (
                        <span className="list_box_span"> #{title_arr}</span>
                      );
                    })}
                    {/* <span className="list_box_span">{arr.title_list}</span> */}
                  </div>
                );
              })}
            </div>
          )}
          {/* </div> */}
          <div></div>
        </div>
      </div>
    );
  }
}

export default withCookies(DayList);
