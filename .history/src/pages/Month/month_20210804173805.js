import React, { Component } from 'react'
import '../Month/month.css'

export default class month extends Component {
    render() {
        return (
            <div id='container'>
                <p>여기 monthly!!!!!</p>
                <div>
                    <span class='month_box'>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                </div>
                <div>
                    <ul>
                        <li>05</li>
                        <li>06</li>
                        <li>07</li>
                        <li>08</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>09</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                    </ul>
                </div>
            </div>
        )
    }
}
