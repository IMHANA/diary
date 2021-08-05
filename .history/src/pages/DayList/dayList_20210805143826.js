import React, { Component } from 'react';
import { Add, ArrowBack , Flag} from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';

export default class dayList extends Component {
    render() {
        return (
            <div id='container'>
                <div>
                    <span>08</span><span>월의 일기 8개</span>
                    <TextField id="standard-secondary" label="Standard secondary" color="green" />
                    <Add />
                    <ArrowBack />
                </div>
                <div>
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
                    <div>
                        <span>0803</span>
                        <Flag/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}
