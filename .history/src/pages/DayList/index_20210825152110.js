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
    console.log('mon_year: ', mon_year);
    fetch('http://localhost:3003/diary/diary_month/' + mon_year, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ diary: data }));
  }

  //로우 선택하면 해당 일기 상세로 이동
  goDayDetail = (e) => {
    console.log(e);
    const day_string = String(e.substring(8, 110));
    console.log('day_string: ', day_string);
  };

  render() {
    console.log(this.state.diary);
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
              <TextField
                id="standard-secondary"
                label="일기찾기"
                color="secondary"
                style={{ width: '80px' }}
              />
              <Add style={{ fontSize: '45px' }} />
              <ArrowBack style={{ fontSize: '45px' }} />
            </div>
          </div>
          <div>
            <div className="list_box">
              {this.state.diary.map((arr, idx) => {
                return (
                  <div
                    className={`${arr.diary_date} date_box`}
                    onClick={() => this.goDayDetail(arr.diary_date)}
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
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default withCookies(DayList);
