import React from 'react';
import { useParams } from 'react-router-dom';
import IssueDetailWrapper from '../Components/IssueDetail/IssueDetailWrapper';

const IssueDetailPage = () => {
  const { issueId } = useParams();

  return (
    <>
      <IssueDetailWrapper issueId={issueId} />
    </>
  );
};

export default IssueDetailPage;
