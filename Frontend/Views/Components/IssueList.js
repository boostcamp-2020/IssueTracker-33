import React from 'react';

// TODO: 헤더(전체 체크박스 + ALMA) 컴포넌트 정의
// TODO: 별개의 컴포넌트로 분리할 지 고민
const IssueListItem = ({ issue, author, labels, assignees, milestone }) => {
  return (
    <div>
      <br />
      <div>
        <span>{issue.title}</span>
        <span>
          {labels.map((label) => (
            <span key={label.id}>{` ${label.name}`}</span>
          ))}
        </span>
      </div>
      <div>
        <span>{`#${issue.id} `}</span>
        <span>{issue.isOpen ? 'opened ' : 'closed '}</span>
        <span>{`${issue.createdAt} by `}</span>
        <span>{author.username}</span>
      </div>
      <div>{milestone && milestone.title}</div>
      {assignees.map((assignee) => (
        <span key={assignee.id}>{`@${assignee.username}`}</span>
      ))}
    </div>
  );
};

const IssueList = ({ issues, users, labels, milestones }) => {
  return (
    <div>
      {issues.map((issue) => (
        <IssueListItem
          key={issue.id}
          issue={issue}
          author={users[issue.userId]}
          labels={issue.labels.map((id) => labels[id])}
          assignees={issue.assignees.map((id) => users[id])}
          milestone={milestones[issue.milestoneId]}
        />
      ))}
    </div>
  );
};

export default IssueList;
