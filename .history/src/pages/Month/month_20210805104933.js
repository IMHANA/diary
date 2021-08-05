import React, { Component } from "react";
import "../Month/month.css";
import {FilterVintage} from '@material-ui/icons';

export default class month extends Component {
  render() {
    return (
      <div id="container">
        {/* <p>여기 monthly!!!!!</p> */}
        <div className="month_box_container first-floor">
          <div className="calendar-item">
            <span className="title"> 01</span>
            <icon variant="FilterVintage"/>
          </div>

          <div className="calendar-item">
            <span className="title"> 02</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 03</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 04</span>
          </div>
        </div>
        <div className="month_box_container">
          <div className="calendar-item">
            <span className="title"> 05</span>
          </div>
          <div className="calendar-item">
            <span className="title"> 06</span>
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
