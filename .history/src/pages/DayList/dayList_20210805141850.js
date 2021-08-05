import React, { Component } from 'react';
import { Add, ArrowBack , FiberManualRecord} from '@material-ui/icons'

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
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                    <div>
                        <span>0803</span>
                        <FiberManualRecord/>
                        <span>#첫번째 #두번째 #세번째 #네번째 #다섯번째 #여섯번째</span>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}
