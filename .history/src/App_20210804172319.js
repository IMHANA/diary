import './App.css';
import React, { Component } from 'react';
import Main from '../pages/Main/main';
import Month from '../pages/Month/month'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

class App extends Component {
  render() {
    console.log('메인을 불러온다!')
    return (

                    <Router>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/monthly' component={ Month }/>
                </Switch>
            </Router>

    )
  }
}

export default App;
