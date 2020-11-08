import React, { useEffect } from 'react';
import axios from 'axios';
import Milestone from './Milestone';

const MilestoneList = (milestoneList) => {
  useEffect(async () => {
    const ISSUE_URL = 'http://localhost:3000/api/v1/issues?groupby=milestones';
    const issueResolve = await axios.get(ISSUE_URL, { withCredentials: true });

    console.log(issueResolve.data);
    // milestoneList.map((m) => console.log(m));
  }, [milestoneList]);

  return <div>asdsad</div>;
};

export default MilestoneList;
