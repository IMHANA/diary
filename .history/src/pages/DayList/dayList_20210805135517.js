import React, { Component } from 'react';
import { Add, ArrowBack } from '@material-ui/icons'

export default class dayList extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>08</span><span>월의 일기 8개</span>
                    <input type='text'></input>
                    <Add />
                    <ArrowBack />
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        )
    }
}
