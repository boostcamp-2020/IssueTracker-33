import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NewIssuePage from './Pages/NewIssuePage';
import IssueMainPage from './Pages/IssueMainPage';
import IssueDetailPage from './Pages/IssueDetailPage';

const App = () => {
  return (
    <Router>
      <Route exact path="/issues" component={IssueMainPage} />
      <Switch>
        <Route exact path="/issues/new" component={NewIssuePage} />
        <Route exact path="/issues/:issueId" component={IssueDetailPage} />
      </Switch>
    </Router>
  );
};

export default App;
