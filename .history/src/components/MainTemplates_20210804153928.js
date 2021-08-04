import React, { Component } from 'react'
import Main from '../pages/Main/main';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default class MainTemplates extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Main}/>
                </Switch>
            </Router>
        )
    }
}
