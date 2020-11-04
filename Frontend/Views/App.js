import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NewIssuePage from './Pages/NewIssuePage';
import IssueMainPage from './Pages/IssueMainPage';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={IssueMainPage} />
      <Route path="/new" component={NewIssuePage} />
    </Router>
  );
};

export default App;
