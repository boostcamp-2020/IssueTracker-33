import React from 'react';
import { useParams } from 'react-router-dom';
import IssueDetailWrapper from '../Components/IssueDetailWrapper';

const IssueDetailPage = () => {
  const { issueId } = useParams();

  return (
    <>
      <IssueDetailWrapper issueId={issueId} />
    </>
  );
};

export default IssueDetailPage;
