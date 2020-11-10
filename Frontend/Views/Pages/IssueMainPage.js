import React from 'react';
import { Link } from 'react-router-dom';
import IssuesPage from './IssuesPage';

const IssueMainPage = () => {
  return (
    <div>
      <Link to="/labels">
        <button type="button">Lables</button>
      </Link>
      <Link to="/milestones">
        <button type="button">Milestones</button>
      </Link>
      <Link to="/issues/new">new Issue</Link>
      <IssuesPage />
    </div>
  );
};

export default IssueMainPage;
