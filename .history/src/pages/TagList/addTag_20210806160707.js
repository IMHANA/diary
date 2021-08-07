import React, { Component } from 'react'
import '../TagList/addTag.css';
import { makeStyles } from '@material-ui/core/styles';
import { ChildCare, DirectionsBoat } from '@material-ui/icons'
import Input from '@material-ui/core/Input';

export default class addTag extends Component {
    render() {
        return (
            <div id='container'>
                <div>
                    20210803
                </div>
                <div className='inputBox'>
                <Input defaultValue="#" inputProps={{ 'aria-label': 'description' }} />
                <Input defaultValue="#" inputProps={{ 'aria-label': 'description' }} />
                <Input defaultValue="#" inputProps={{ 'aria-label': 'description' }} />
                <Input defaultValue="#" inputProps={{ 'aria-label': 'description' }} />
                <Input defaultValue="#" inputProps={{ 'aria-label': 'description' }} />
                <Input defaultValue="#" inputProps={{ 'aria-label': 'description' }} />
                </div>
                <div>
                    <ChildCare/>
                    <DirectionsBoat/>
                    <ChildCare/>
                    <DirectionsBoat/>
                    <ChildCare/>
                    <DirectionsBoat/>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}
