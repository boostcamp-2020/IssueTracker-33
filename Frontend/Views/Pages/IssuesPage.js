import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueList from '../Components/IssueList';

const toKeyValueMap = (records) => {
  const map = {};
  records.forEach((record) => {
    map[record.id] = record;
  });
  return map;
};

const IssuesPage = () => {
  const [data, setData] = useState({ issueData: [], userData: [], labelData: [], mileData: [] });

  useEffect(async () => {
    // TODO: Append query string for issue filtering
    const ISSUE_URL = 'http://localhost:3000/api/v1/issues';
    const USER_URL = 'http://localhost:3000/api/v1/users';
    const LABEL_URL = 'http://localhost:3000/api/v1/labels';
    const MILE_URL = 'http://localhost:3000/api/v1/milestones';

    const issueProm = axios.get(ISSUE_URL);
    const userProm = axios.get(USER_URL);
    const labelProm = axios.get(LABEL_URL);
    const mileProm = axios.get(MILE_URL);

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
  }, []);

  return (
    <div>
      <IssueList issues={data.issueData} users={data.userData} labels={data.labelData} milestones={data.mileData} />
    </div>
  );
};

export default IssuesPage;
