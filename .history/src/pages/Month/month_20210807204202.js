import React, { Component } from "react";
import "../Month/month.css";
import { EmojiEmotions, FilterVintage, Spa, WbCloudy, MoodBad } from '@material-ui/icons'
import { sizeHeight } from "@material-ui/system";
// import "../../assets";
export default class month extends Component {
  render() {
    // let name = {happy, angry, good, sad, soso, tired, what};
    // const url = '/image' + name + '.png';
    const happy = '/image/happy.png';
    const angry = '/image/angry.png';
    const good = '/image/good.png';
    const sad = '/image/sad.png';
    const soso = '/image/soso.png';
    const tired = '/image/tired.png';
    const what = '/image/what.png';
    
    return (
        
      <div id="container">
        {/* <p>여기 monthly!!!!!</p> */}
        <div className="month_box_container first-floor">
          <div className="calendar-item">
            <span className="title"> 01</span>
            <div>
            <img className="sticker" src={happy} alt={happy} title={happy}/>
                {/* <EmojiEmotions color='warning' className='monthIcon'/> */}
                </div>
          </div>

          <div className="calendar-item">
            <span className="title"> 02
            <img className="sticker" src={sad} alt={sad} title={sad}/>
                {/* <FilterVintage color='error' className='monthIcon'/> */}
            </span>
          </div>
          <div className="calendar-item">
            <span className="title"> 03
            <img className="sticker" src={what} alt={what} title={what}/>
                {/* <Spa color='secondary' className='monthIcon'/> */}
            </span>
          </div>
          <div className="calendar-item">
            <span className="title"> 04
            <img className="sticker" src={soso} alt={soso} title={soso}/>
                {/* <WbCloudy color='primary' className='monthIcon'/> */}
            </span>
          </div>
        </div>
        <div className="month_box_container">
          <div className="calendar-item">
            <span className="title"> 05
            <img className="sticker" src={angry} alt={angry} title={angry}/>
                {/* <MoodBad className='monthIcon'/> */}
            </span>
          </div>
          <div className="calendar-item">
            <span className="title"> 06
            <img className="sticker" src={tired} alt={tired} title={tired}/>
            </span>
          </div>
          <div className="calendar-item">
            <span className="title"> 07</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 08</span>
          </div>
        </div>
        <div className="month_box_container">
          <div className="calendar-item">
            <span className="title"> 09</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 10</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 11</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 12</span>
          </div>
        </div>
        <div id="year_row">
          <span>20</span>
          <span>21</span>
          <span>22</span>
        </div>
      </div>
    );
  }
}
