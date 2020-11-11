import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useHistory, Route, Switch } from 'react-router-dom';

import NewIssuePage from './Pages/NewIssuePage';
import IssueMainPage from './Pages/IssueMainPage';
import IssueDetailPage from './Pages/IssueDetailPage';
import LoginPage from './Pages/LoginPage';
import LabelPage from './Pages/LabelPage';
import MilestonPage from './Pages/MilestonePage';
import NewMilestonePage from './Pages/NewMilestonePage';

const milestonesReducer = (milestones, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const labelsReducer = (labels, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const usersReducer = (users, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

export const UsersContext = React.createContext();
export const MilestonesContext = React.createContext();
export const LabelsContext = React.createContext();

const App = () => {
  const history = useHistory();

  const onClickHeader = () => {
    history.push('/issues');
  };
  const [milestones, milestonesDispatch] = useReducer(milestonesReducer, '');
  const [labels, labelsDispatch] = useReducer(labelsReducer, '');
  const [users, usersDispatch] = useReducer(usersReducer, '');

  useEffect(async () => {
    const USER_URL = `${process.env.API_URL}/${process.env.API_VERSION}/users`;
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    const MILE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/milestones`;

    const userProm = axios.get(USER_URL, { withCredentials: true });
    const labelProm = axios.get(LABEL_URL, { withCredentials: true });
    const mileProm = axios.get(MILE_URL, { withCredentials: true });

    try {
      const [userResolve, labelResolve, mileResolve] = await Promise.all([userProm, labelProm, mileProm]);

      milestonesDispatch({ type: 'setInitial', data: mileResolve.data });
      labelsDispatch({ type: 'setInitial', data: labelResolve.data });
      usersDispatch({ type: 'setInitial', data: userResolve.data });
    } catch (err) {
      window.location.href = process.env.WEB_URL;
    }
  }, []);

  return (
    <LabelsContext.Provider value={{ labels, labelsDispatch }}>
      <UsersContext.Provider value={{ users, usersDispatch }}>
        <MilestonesContext.Provider value={{ milestones, milestonesDispatch }}>
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
        </MilestonesContext.Provider>
      </UsersContext.Provider>
    </LabelsContext.Provider>
  );
};

export default App;
