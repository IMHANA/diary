import React, { Component } from 'react'
import Main from '../pages/Main/main';
import Month from '../pages/Month/month';
import DayList from '../pages/DayList/dayList';
import AddTag from '../pages/TagList/addTag';
import newDay from '../pages/NewDay/newDay';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default class MainTemplates extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/monthly' component={ Month }/>
                    <Route path='/list' component={ DayList } />
                    <Route path='/tagList' component={ AddTag } />
                    <Route path='/newDay' component={ newDay } />
                </Switch>
            </Router>
        )
    }
}
