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
      year: '',
      month: '',
    };
  }

  componentDidMount() {
    const mon_year = this.state.year + this.state.month;
    fetch('http://localhost:3003/user/diary_month/' + mon_year, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          alert('okok');
        }
      });
  }

  render() {
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
              <span id="month_sub">월의 일기 8개</span>
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
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div className="list_box">
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div className="list_box">
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div className="list_box">
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div className="list_box">
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div className="list_box">
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div className="list_box">
              <span className="date">
                <Minimize /> 0803
              </span>
              <Flag className="listicon" />
              <span className="list_box_span">
                #첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째
              </span>
            </div>
            <div id="more_btn">
              <ExpandMore className="icon2" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default withCookies(DayList);
