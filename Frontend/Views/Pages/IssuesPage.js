import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueList from '../Components/IssueList/IssueList';

const toKeyValueMap = (records) => {
  const map = {};
  records.forEach((record) => {
    map[record.id] = record;
  });
  return map;
};

const IssuesPage = () => {
  const [data, setData] = useState({ issueData: [], userData: [], labelData: [], mileData: [] });
  const [issueReload, setIssueReload] = useState(true);

  const reloadIssue = () => {
    setIssueReload((prevIssueReload) => !prevIssueReload);
  };

  useEffect(async () => {
    const ISSUE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues`;
    const USER_URL = `${process.env.API_URL}/${process.env.API_VERSION}/users`;
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    const MILE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/milestones`;

    const queryString = window.location.search;
    const issueProm = axios.get(`${ISSUE_URL}${queryString}`, { withCredentials: true });
    const userProm = axios.get(USER_URL, { withCredentials: true });
    const labelProm = axios.get(LABEL_URL, { withCredentials: true });
    const mileProm = axios.get(MILE_URL, { withCredentials: true });

    try {
      const [issueResolve, userResolve, labelResolve, milesResolve] = await Promise.all([
        issueProm,
        userProm,
        labelProm,
        mileProm,
      ]);

      setData({
        issueData: issueResolve.data,
        userData: toKeyValueMap(userResolve.data),
        labelData: toKeyValueMap(labelResolve.data),
        mileData: toKeyValueMap(milesResolve.data),
      });
    } catch (err) {
      window.location.href = process.env.WEB_URL;
    }
  }, [issueReload]);

  useEffect(() => {
    const reloadWhenPopstate = () => reloadIssue();
    window.addEventListener('popstate', reloadWhenPopstate);
    return () => window.removeEventListener('popstate', reloadWhenPopstate);
  }, []);

  return (
    <div>
      <IssueList
        issues={data.issueData}
        users={data.userData}
        labels={data.labelData}
        milestones={data.mileData}
        reloadIssue={reloadIssue}
      />
    </div>
  );
};

export default IssuesPage;
