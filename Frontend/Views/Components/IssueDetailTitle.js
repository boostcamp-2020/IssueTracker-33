import React from 'react';

const IssueDetailTitle = ({ issueData }) => {
  return (
    <>
      <div>{issueData.title}</div>
      <div>{`#${issueData.id}`}</div>
    </>
  );
};

export default IssueDetailTitle;
