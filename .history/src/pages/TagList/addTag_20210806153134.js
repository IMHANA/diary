import React, { Component } from 'react'
import '../TagList/addTag.css';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

export default class addTag extends Component {
    render() {
        return (
            <div>
                <div>
                    20210803
                </div>
                <div>
                <Input defaultValue="Hello" inputProps={{ 'aria-label': 'description' }} />
                </div>
                <div>
                    
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}
