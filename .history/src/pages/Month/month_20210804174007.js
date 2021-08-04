import React, { Component } from 'react'
import '../Month/month.css'

export default class month extends Component {
    render() {
        return (
            <div id='container'>
                <p>여기 monthly!!!!!</p>
                <div>
                    <span class='month_box'>01</span>
                    <span class='month_box'>02</span>
                    <span class='month_box'>03</span>
                    <span class='month_box'>04</span>
                </div>
                <div>
                    <span class='month_box'>05</span>
                    <span class='month_box'>06</span>
                    <span class='month_box'>07</span>
                    <span class='month_box'>08</span>
                </div>
                <div>
                    <span class='month_box'>09</span>
                    <span class='month_box'>10</span>
                    <span class='month_box'>11</span>
                    <span class='month_box'>12</span>
                </div>
            </div>
        )
    }
}
