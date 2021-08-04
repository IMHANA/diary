import React, { Component } from 'react'
import '../Month/month.css'

export default class month extends Component {
    render() {
        return (
            <div id='container'>
                <p>여기 monthly!!!!!</p>
                <div className='month_box_container'>
                    <div className='month_box'>01</div>
                    <div className='month_box'>02</div>
                    <div className='month_box'>03</div>
                    <div className='month_box'>04</div>
                </div>
                <div className='month_box_container'>
                    <div className='month_box'>05</div>
                    <div className='month_box'>06</div>
                    <div className='month_box'>07</div>
                    <div className='month_box'>08</div>
                </div>
                <div className='month_box_container'>
                    <div className='month_box'>09</div>
                    <div className='month_box'>10</div>
                    <div className='month_box'>11</div>
                    <div className='month_box'>12</div>
                </div>
            </div>
        )
    }
}
