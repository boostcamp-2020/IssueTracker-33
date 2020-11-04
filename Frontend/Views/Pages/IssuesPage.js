import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueList from '../Components/IssueList';

const IssuesPage = () => {
  const [issueData, setIssue] = useState([]);
  const [userData, setUser] = useState([]);
  const [labelData, setLabel] = useState([]);
  const [mileData, setMile] = useState([]);

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

    const [{ data: issues }, { data: users }, { data: labels }, { data: milestones }] = await Promise.all([
      issueProm,
      userProm,
      labelProm,
      mileProm,
    ]);

    setIssue(issues);
    setUser(users);
    setLabel(labels);
    setMile(milestones);
  }, []);

  return (
    <div>
      <IssueList issues={issueData} users={userData} labels={labelData} milestones={mileData} />
    </div>
  );
};

export default IssuesPage;
