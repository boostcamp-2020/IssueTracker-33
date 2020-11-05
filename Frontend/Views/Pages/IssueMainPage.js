import React from 'react';
import { Link } from 'react-router-dom';
import IssuesPage from './IssuesPage';

const IssueMainPage = () => {
  return (
    <div>
      <Link to="/issues/new">new Issue</Link>
      <IssuesPage />
    </div>
  );
};

export default IssueMainPage;
