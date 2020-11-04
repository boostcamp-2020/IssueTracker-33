import React, { useEffect, useState } from 'react';

// TODO: 헤더(전체 체크박스 + ALMA) 컴포넌트 정의

// TODO: 별개의 컴포넌트로 분리할 지 고민

const IssueListItem = ({ issue, setCheckedIssues, checkedIssues, isCheckAll }) => {
  const [isChecked, setIsChecked] = useState(isCheckAll);

  const onCheckIssue = () => {
    if (isChecked === false) {
      setIsChecked(true);
      setCheckedIssues([...checkedIssues, issue.id]);
    } else {
      setIsChecked(false);
      setCheckedIssues(checkedIssues.filter((elem) => elem !== issue.id));
    }
  };

  return (
    <>
      <input key={issue.id} checked={isChecked} type="checkbox" onChange={onCheckIssue} />
      <div>{issue.title}</div>
    </>
  );
};

const IssueList = ({ issues, users, labels, milestones }) => {
  const [checkedIssues, setCheckedIssues] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  useEffect(() => {
    console.log(checkedIssues);
  }, [JSON.stringify(checkedIssues)]);

  // const onCheckIssue = (id, e) => {
  //   const index = checkedIssues.indexOf(id);
  //   if (index >= 0) {
  //     setCheckedIssues(checkedIssues.filter((elem) => elem !== id));
  //   } else {
  //     setCheckedIssues([...checkedIssues, id]);
  //   }
  // };

  const onCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setCheckedIssues([]);
    } else {
      setIsCheckAll(true);
      setCheckedIssues(issues.map((issue) => issue.id));
    }
  };

  return (
    <div>
      <input type="checkbox" onChange={onCheckAll} isCheckAll={isCheckAll} />
      {issues.map((issue) => (
        <>
          <IssueListItem
            key={issue.id}
            issue={issue}
            setCheckedIssues={setCheckedIssues}
            checkedIssues={checkedIssues}
          />
        </>
      ))}
    </div>
  );
};

export default IssueList;
