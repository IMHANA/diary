import React, { Component } from 'react'
import { Add, ArrowBack , Flag, ExpandMore, Minimize } from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';

export default class newDay extends Component {
    render() {
        return (
            <div id='container'>
                <div className='list-con2'>
                    <TextField id="standard-secondary" label="일기찾기" color="secondary" style={{width: '80px'}} />
                    <Add style={{fontSize: '45px'}}/>
                    <ArrowBack style={{fontSize: '45px'}} />
                </div>
                <div>
                    <h2>20210803</h2>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}
