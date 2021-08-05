import React, { Component } from 'react'
import '../Month/month.css'

export default class month extends Component {
    render() {
        return (
            <div id='container'>
                {/* <p>여기 monthly!!!!!</p> */}
                <div className='month_box_container'>
                    <div><span>01</span></div>
                    <div><span>02</span></div>
                    <div><span>03</span></div>
                    <div><span>04</span></div>
                </div>
                <div className='month_box_container'>
                    <div>05</div>
                    <div>06</div>
                    <div>07</div>
                    <div>08</div>
                </div>
                <div className='month_box_container'>
                    <div>09</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                </div>
                <div id='year_row'>
                    <span>20</span>
                    <span>21</span>
                    <span>22</span>
                </div>
            </div>
        )
    }
}
