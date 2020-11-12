import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';

import NewIssuePage from './Pages/NewIssuePage';
import IssueMainPage from './Pages/IssueMainPage';
import IssueDetailPage from './Pages/IssueDetailPage';
import LoginPage from './Pages/LoginPage';
import LabelPage from './Pages/LabelPage';
import MilestonPage from './Pages/MilestonePage';
import NewMilestonePage from './Pages/NewMilestonePage';

import GlobalStyle from '../style/globalStyles';

const App = () => {
  const history = useHistory();

  const onClickHeader = () => {
    history.push('/issues');
  };

  return (
    <>
      <GlobalStyle />
      <div onClick={onClickHeader}>Issues</div>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/issues" component={IssueMainPage} />
      <Switch>
        <Route exact path="/issues/new" component={NewIssuePage} />
        <Route exact path="/issues/:issueId" component={IssueDetailPage} />
      </Switch>
      <Switch>
        <Route exact path="/milestones" component={MilestonPage} />
        <Route exact path="/milestones/new" component={NewMilestonePage} />
      </Switch>
      <Route exact path="/labels" component={LabelPage} />
    </>
  );
};

export default App;
