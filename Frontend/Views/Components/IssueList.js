import React, { useEffect, useState } from 'react';

// TODO: 헤더(전체 체크박스 + ALMA) 컴포넌트 정의
// TODO: 별개의 컴포넌트로 분리할 지 고민

const MarkAs = () => {
  return (
    <>
      <button type="button">Mark as</button>
    </>
  );
};

const Alma = () => {
  return (
    <>
      <button type="button">Author</button>
      <button type="button">Labels</button>
      <button type="button">Milestone</button>
      <button type="button">Assignees</button>
    </>
  );
};

const IssueListItem = ({
  issue,
  author,
  labels,
  assignees,
  milestone,
  setCheckedIssues,
  checkedIssues,
  isCheckAll,
  setAllChecked,
  allCheckValue,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(isCheckAll);
  }, [isCheckAll]);

  useEffect(() => {
    if (allCheckValue) {
      setIsChecked(allCheckValue);
    }
  }, [allCheckValue]);

  const onCheckIssue = () => {
    if (isChecked === false) {
      setIsChecked(true);
      setCheckedIssues([...checkedIssues, issue.id]);
    } else {
      setIsChecked(false);
      setCheckedIssues(checkedIssues.filter((elem) => elem !== issue.id));
      setAllChecked(false);
    }
  };

  return (
    <div>
      <br />
      <div>
        <input key={issue.id} checked={isChecked} type="checkbox" onChange={onCheckIssue} />
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
  const [checkedIssues, setCheckedIssues] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [isMarkAs, setIsMarkAs] = useState(false);

  // 콘솔에 선택된 이슈 디버깅 용도입니다. 이후 삭제해도 무방합니다.
  useEffect(() => {
    console.log(checkedIssues);
  }, [JSON.stringify(checkedIssues)]);

  useEffect(() => {
    if (checkedIssues.length === 0) {
      setAllChecked(false);
      setIsMarkAs(false);
    } else if (checkedIssues.length === issues.length) {
      setAllChecked(true);
      setIsMarkAs(true);
    } else if (checkedIssues.length > 0) {
      setIsMarkAs(true);
    }
  }, [checkedIssues]);

  const onCheckAll = () => {
    if (isCheckAll && !allChecked) {
      setCheckedIssues(issues.map((issue) => issue.id));
      setAllChecked(true);
    } else if (isCheckAll) {
      setIsCheckAll(false);
      setCheckedIssues([]);
    } else {
      setIsCheckAll(true);
      setCheckedIssues(issues.map((issue) => issue.id));
    }
  };

  return (
    <div>
      <input type="checkbox" onChange={onCheckAll} checked={allChecked} />
      {isMarkAs && <MarkAs />}
      {!isMarkAs && <Alma />}
      {issues.map((issue) => (
        <IssueListItem
          key={issue.id}
          issue={issue}
          author={users[issue.userId]}
          labels={issue.labels.map((id) => labels[id])}
          assignees={issue.assignees.map((id) => users[id])}
          milestone={milestones[issue.milestoneId]}
          setCheckedIssues={setCheckedIssues}
          checkedIssues={checkedIssues}
          isCheckAll={isCheckAll}
          setAllChecked={setAllChecked}
          allCheckValue={allChecked}
        />
      ))}
    </div>
  );
};

export default IssueList;
