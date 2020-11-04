import React, { useEffect } from 'react';
import axios from 'axios';
import IssueList from '../Components/IssueList';

const IssuesPage = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <IssueList />
    </div>
  );
};

export default IssuesPage;
