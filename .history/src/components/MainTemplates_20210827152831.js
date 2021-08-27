import React, { Component } from 'react';
import { Main, Month, DayList, AddTag, NewDay } from '../pages';
import AddNewDiary from '../pages/AddNewDiary';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class MainTemplates extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/monthly/month/:day" component={NewDay} />
          <Route path="/monthly/:month" component={DayList} />
          <Route path="/monthly" component={Month} />
          {/* <Route path="/list" component={DayList} /> */}
          <Route path="/addTag" component={AddTag} />
          <Route path="/newDiary" component={NewDay} />
          <Route path="/addNewDiary" component={AddNewDiary} />
        </Switch>
      </Router>
    );
  }
}
