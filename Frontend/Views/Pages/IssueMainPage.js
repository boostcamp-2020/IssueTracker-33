import React from 'react';
import { Link } from 'react-router-dom';

const IssueMainPage = () => {
  return (
    <div>
      <h1>issueMain</h1>
      <Link to="/issues/new">new Issue</Link>
    </div>
  );
};

export default IssueMainPage;
