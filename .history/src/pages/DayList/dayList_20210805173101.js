import React, { Component } from 'react';
import { Add, ArrowBack , Flag} from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';
import '../DayList/dayList.css';

export default class dayList extends Component {
    render() {
        return (
            <div id='container'>
                <div id='sub_box'>
                    <div>
                        <span id='month'>08</span><span>월의 일기 8개</span>
                        <TextField id="standard-secondary" label="Standard secondary" color="secondary" />
                        <Add style={{fontSize: '45px'}}/>
                        <ArrowBack style={{fontSize: '45px'}} />
                    </div>
                    <div id='title'
                    
                    ></div>
                    <div>
                        <div className='list_box'>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                        <div>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                        <div>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                        <div>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                        <div>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                        <div>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                        <div>
                            <span>0803</span>
                            <Flag/>
                            <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}
