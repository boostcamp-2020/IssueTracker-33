import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IssueListItem from './IssueListItem';
import TopFilter from './TopFilter';
import MarkAs from './MarkAs';
import Alma from './Alma';

const IssueList = ({ issues, users, labels, milestones, reloadIssue }) => {
  const [checkedIssues, setCheckedIssues] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [isMarkAs, setIsMarkAs] = useState(false);
  const [resetQuery, setResetQuery] = useState(window.location.search !== '');

  const history = useHistory();

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

  const onClickReset = () => {
    setResetQuery(false);
    history.push('/issues');
    reloadIssue();
  };

  return (
    <div>
      <TopFilter reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      {resetQuery && (
        <button type="button" onClick={onClickReset}>
          Clear current search query, filters, and sorts
        </button>
      )}
      <input type="checkbox" onChange={onCheckAll} checked={allChecked} />
      {isMarkAs && (
        <MarkAs
          reloadIssue={reloadIssue}
          checkedIssues={checkedIssues}
          setIsMarkAs={setIsMarkAs}
          setAllChecked={setAllChecked}
        />
      )}
      {!isMarkAs && (
        <Alma
          reloadIssue={reloadIssue}
          users={users}
          labels={labels}
          milestones={milestones}
          setResetQuery={setResetQuery}
        />
      )}
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
          allChecked={allChecked}
          isMarkAs={isMarkAs}
        />
      ))}
    </div>
  );
};

export default IssueList;
