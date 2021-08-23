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
// import "../../assets";
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
    };
  }

  componentDidMount() {
    fetch('http://localhost:3003/diary/diary_year/2021', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ montly: data }));

    fetch('http://localhost:3003/diary/montly_sticker/2021', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => this.setState({ sticker: data }));
  }

  render() {
    const { user_id } = this.state;
    console.log('잘 오나...', user_id);
    console.log(this.state.montly);
    console.log(this.state.sticker);
    // let name = {happy, angry, good, sad, soso, tired, what};
    // const url = '/image' + name + '.png';
    const happy = '/image/happy.png';
    const angry = '/image/angry.png';
    const good = '/image/good.png';
    const sad = '/image/sad.png';
    const soso = '/image/soso.png';
    const tired = '/image/tired.png';
    const what = '/image/what.png';

    const list = [];
    for (let i = 1; i <= 12; i++) {
      let emoji = happy; // default가 happy
      let i_num = '';
      if (i < 10) {
        i_num = '0' + String(i);
      } else {
        i_num = String(i);
      } // 몇 월인지 표시

      this.state.sticker.forEach((arr) => {
        const month = arr.ds.substring(5, 7);

        for (let i = 1; i <= 12; i++) {}
        if (arr.sticker === 1) {
          emoji = angry;
        } else if (arr.sticker === 2) {
          emoji = good;
        }

        if (month === i_num) {
          list.push(
            <div className="calendar-item">
              <span className="title"> {month}</span>
              <div>
                <img className="sticker" src={emoji} alt={happy} />
              </div>
            </div>
          );
        }
        // else {
        //   list.push(
        //     <div className="calendar-item">
        //       <span className="title"> {i_num}</span>
        //       <div>
        //         <img className="sticker" src={emoji} alt={happy} />
        //       </div>
        //     </div>
        //   );
        // }
      });

      // list.push(
      //   <div className="calendar-item">
      //     <span className="title"> {i_num}</span>
      //     <div>
      //       <img className="sticker" src={happy} alt={happy} />
      //     </div>
      //   </div>
      // );
    }

    return (
      <div id="container">
        {/* <p>여기 monthly!!!!!</p> */}
        <div className="month_box_container first-floor">{list}</div>

        <div id="year_row">
          <span>20</span>
          <span>21</span>
          <span>22</span>
        </div>
      </div>
    );
  }
}

export default withCookies(Month);
