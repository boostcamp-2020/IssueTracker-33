import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IssueListItem from './IssueListItem';
import TopFilter from './TopFilter';
import MarkAs from './MarkAs';
import Alma from './Alma';
// eslint-disable-next-line import/no-cycle
import { MilestonesContext, LabelsContext, UsersContext } from '../../App';
// eslint-disable-next-line import/no-cycle
import { IssuesContext, ReloadContext } from '../../Pages/IssuesPage';

const toKeyValueMap = (records) => {
  if (!records) return;
  const map = {};
  records.forEach((record) => {
    map[record.id] = record;
  });
  return map;
};

const IssueList = () => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { issues } = useContext(IssuesContext);
  const { users } = useContext(UsersContext);
  const { labels } = useContext(LabelsContext);
  const { milestones } = useContext(MilestonesContext);
  const mappedUsers = toKeyValueMap(users);
  const mappedLabels = toKeyValueMap(labels);
  const mappedMilestones = toKeyValueMap(milestones);

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
    reloadDispatch({ type: 'switch' });
  };

  return (
    <div>
      <TopFilter setResetQuery={setResetQuery} />
      {resetQuery && (
        <button type="button" onClick={onClickReset}>
          Clear current search query, filters, and sorts
        </button>
      )}
      <input type="checkbox" onChange={onCheckAll} checked={allChecked} />
      {isMarkAs && <MarkAs checkedIssues={checkedIssues} setIsMarkAs={setIsMarkAs} setAllChecked={setAllChecked} />}
      {!isMarkAs && (
        <Alma users={mappedUsers} labels={mappedLabels} milestones={mappedMilestones} setResetQuery={setResetQuery} />
      )}
      {issues.map((issue) => (
        <IssueListItem
          key={issue.id}
          issue={issue}
          author={mappedUsers[issue.userId]}
          labels={issue.labels.map((id) => mappedLabels[id])}
          assignees={issue.assignees.map((id) => mappedUsers[id])}
          milestone={mappedMilestones[issue.milestoneId]}
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
