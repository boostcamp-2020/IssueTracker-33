import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import IssueDetailWrapper from '../Components/IssueDetail/IssueDetailWrapper';

const PagePad = styled.div`
  padding: 0 300px;
`;

const IssueDetailPage = () => {
  const { issueId } = useParams();

  return (
    <PagePad>
      <IssueDetailWrapper issueId={issueId} />
    </PagePad>
  );
};

export default IssueDetailPage;
