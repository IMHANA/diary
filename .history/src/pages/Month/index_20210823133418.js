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

    const list = [];
    const i_num_arr = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    i_num_arr.forEach((val) => {
      list.push(
        <div className="calendar-item">
          <span className="title">{val}</span>
          <div>
            <img
              id={`month${val}`}
              className="sticker"
              src={`/image/soso.png`}
              alt="이미지 설명"
              title="마우스 오버 시 나오는 설명"
            />
          </div>
        </div>
      );

      // 12달 돌기
      // if (month === val) {
      //   list.push(
      //     <div className="calendar-item">
      //       <span className="title"> {month}</span>
      //       <div>
      //         <img
      //           className="sticker"
      //           src={`/image/${arr.sticker}.png`}
      //           alt="이미지 설명"
      //           title="마우스 오버 시 나오는 설명"
      //         />
      //       </div>
      //     </div>
      //   );
      // } else {

      // }
    });

    // this.state.sticker.forEach((arr) => {
    //   // 출력된 row만큼 돌기
    //   const month = arr.ds.substring(5, 7);

    //   i_num_arr.forEach((val) => {
    //     // 12달 돌기
    //     if (month === val) {
    //       list.push(
    //         <div className="calendar-item">
    //           <span className="title"> {month}</span>
    //           <div>
    //             <img
    //               className="sticker"
    //               src={`/image/${arr.sticker}.png`}
    //               alt="이미지 설명"
    //               title="마우스 오버 시 나오는 설명"
    //             />
    //           </div>
    //         </div>
    //       );
    //     } else {
    //       list.push(
    //         <div className="calendar-item">
    //           <span className="title">{val}</span>
    //           <div>
    //             <img
    //               className="sticker"
    //               src={`/image/soso.png`}
    //               alt="이미지 설명"
    //               title="마우스 오버 시 나오는 설명"
    //             />
    //           </div>
    //         </div>
    //       );
    //     }
    //   });
    //   // if (arr.sticker === 1) {
    //   //   emoji = angry;
    //   // } else if (arr.sticker === 2) {
    //   //   emoji = good;
    //   // }
    // });

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
