import React, { Component } from 'react'
import '../Month/month.css'

export default class month extends Component {
    render() {
        return (
            <div id='container'>
                {/* <p>여기 monthly!!!!!</p> */}
                <div className='month_box_container'>
                    <p>01</p>
                    <p>02</p>
                    <p>03</p>
                    <p>04</p>
                </div>
                <div className='month_box_container'>
                    <p>05</p>
                    <p>06</p>
                    <p>07</p>
                    <p>08</p>
                </div>
                <div className='month_box_container'>
                    <p>09</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
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
