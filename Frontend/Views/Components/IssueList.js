import React from 'react';

// TODO: 헤더(전체 체크박스 + ALMA) 컴포넌트 정의

// TODO: 별개의 컴포넌트로 분리할 지 고민
const IssueListItem = ({ issue }) => {
  return <div>{issue.title}</div>;
};

const IssueList = ({ issues, users, labels, milestones }) => {
  return (
    <div>
      {issues.map((issue) => (
        <IssueListItem key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueList;
