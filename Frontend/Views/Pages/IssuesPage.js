import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import IssueList from '../Components/IssueList/IssueList';
import { issuesReducer, reloadReducer, IssuesContext, ReloadContext } from '../store/IssuesPageStore';

const IssuesPage = () => {
  const [issues, issuesDispatch] = useReducer(issuesReducer, []);
  const [reload, reloadDispatch] = useReducer(reloadReducer, false);

  useEffect(async () => {
    const ISSUE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues`;
    const queryString = window.location.search;

    try {
      const issueResolve = await axios.get(`${ISSUE_URL}${queryString}`, { withCredentials: true });
      issuesDispatch({ type: 'setInitial', data: issueResolve.data });
    } catch (err) {
      window.location.href = process.env.WEB_URL;
    }
  }, [reload]);

  useEffect(() => {
    const reloadWhenPopstate = () => reloadDispatch({ type: 'switch' });
    window.addEventListener('popstate', reloadWhenPopstate);
    return () => window.removeEventListener('popstate', reloadWhenPopstate);
  }, []);

  return (
    <div>
      <ReloadContext.Provider value={{ reloadDispatch }}>
        <IssuesContext.Provider value={{ issues, issuesDispatch }}>
          <IssueList />
        </IssuesContext.Provider>
      </ReloadContext.Provider>
    </div>
  );
};

export default IssuesPage;
