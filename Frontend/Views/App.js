import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NewIssuePage from './Pages/NewIssuePage';
import IssueMainPage from './Pages/IssueMainPage';
import LoginPage from './Pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/issues" component={IssueMainPage} />
      <Route path="/issues/new" component={NewIssuePage} />
    </Router>
  );
};

export default App;
