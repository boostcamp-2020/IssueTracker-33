import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IssueListItem from './IssueListItem';
import TopFilter from './TopFilter';
import MarkAs from './MarkAs';
import Alma from './Alma';
import { MilestonesContext, LabelsContext, UsersContext } from '../../App';
import { IssuesContext, ReloadContext } from '../../Pages/IssuesPage';

const toKeyValueMap = (records) => {
  if (!records) return;
  const map = {};
  records.forEach((record) => {
    map[record.id] = record;
  });
  return map;
};

const isQueryReducer = (isQuery, { type, data }) => {
  switch (type) {
    case 'switch':
      return data;
    default:
  }
};

const checkedIssuesReducer = (checkedIssues, { type, data, option }) => {
  switch (type) {
    case 'addAll':
      return data;
    case 'deleteAll':
      return [];
    case 'add':
      return [...checkedIssues, data];
    case 'filter':
      return checkedIssues.filter((elem) => elem !== option);
    default:
  }
};

const isCheckAllReducer = (isCheckAll, { type, data }) => {
  switch (type) {
    case 'set':
      return data;
    default:
  }
};

const allCheckedReducer = (allChecked, { type, data }) => {
  switch (type) {
    case 'set':
      return data;
    default:
  }
};

const isMarkAsReducer = (isMarkAs, { type, data }) => {
  switch (type) {
    case 'set':
      return data;
    default:
  }
};

export const IsQueryContext = React.createContext();
export const CheckedIssuesContext = React.createContext();
export const IsCheckAllContext = React.createContext();
export const AllCheckedContext = React.createContext();
export const IsMarkAsContext = React.createContext();

const IssueList = () => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { issues } = useContext(IssuesContext);
  const { users } = useContext(UsersContext);
  const { labels } = useContext(LabelsContext);
  const { milestones } = useContext(MilestonesContext);
  const mappedUsers = toKeyValueMap(users);
  const mappedLabels = toKeyValueMap(labels);
  const mappedMilestones = toKeyValueMap(milestones);

  const [checkedIssues, checkedIssuesDispatch] = useReducer(checkedIssuesReducer, []);
  const [isQuery, isQueryDispatch] = useReducer(isQueryReducer, window.location.search !== '');
  const [isCheckAll, isCheckAllDispatch] = useReducer(isCheckAllReducer, false);
  const [allChecked, allCheckedDispatch] = useReducer(allCheckedReducer, false);
  const [isMarkAs, isMarkAsDispatch] = useReducer(isMarkAsReducer, false);

  const history = useHistory();

  useEffect(() => {
    if (checkedIssues.length === 0) {
      allCheckedDispatch({ type: 'set', data: false });
      isMarkAsDispatch({ type: 'set', data: false });
    } else if (checkedIssues.length === issues.length) {
      allCheckedDispatch({ type: 'set', data: true });
      isMarkAsDispatch({ type: 'set', data: true });
    } else if (checkedIssues.length > 0) {
      isMarkAsDispatch({ type: 'set', data: true });
    }
  }, [checkedIssues]);

  const onCheckAll = () => {
    if (isCheckAll && !allChecked) {
      checkedIssuesDispatch({ type: 'addAll', data: issues.map((issue) => issue.id) });
      allCheckedDispatch({ type: 'set', data: true });
    } else if (isCheckAll) {
      isCheckAllDispatch({ type: 'set', data: false });
      checkedIssuesDispatch({ type: 'deleteAll' });
    } else {
      isCheckAllDispatch({ type: 'set', data: true });
      checkedIssuesDispatch({ type: 'addAll', data: issues.map((issue) => issue.id) });
    }
  };

  const onClickReset = () => {
    isQueryDispatch({ type: 'switch', data: false });
    history.push('/issues');
    reloadDispatch({ type: 'switch' });
  };

  const getMetaData = (issue) => {
    return {
      issue,
      author: mappedUsers[issue.userId],
      labels: issue.labels || issue.labels.map((id) => mappedLabels[id]),
      assignees: issue.assignees || issue.assignees.map((id) => mappedUsers[id]),
      milestone: mappedMilestones[issue.milestoneId],
    };
  };

  return (
    <div>
      <IsMarkAsContext.Provider value={{ isMarkAs, isMarkAsDispatch }}>
        <AllCheckedContext.Provider value={{ allChecked, allCheckedDispatch }}>
          <IsCheckAllContext.Provider value={{ isCheckAll }}>
            <CheckedIssuesContext.Provider value={{ checkedIssues, checkedIssuesDispatch }}>
              <IsQueryContext.Provider value={{ isQueryDispatch }}>
                <TopFilter />
                {isQuery && (
                  <button type="button" onClick={onClickReset}>
                    Clear current search query, filters, and sorts
                  </button>
                )}
                <input type="checkbox" onChange={onCheckAll} checked={allChecked} />
                {isMarkAs && <MarkAs />}
                {!isMarkAs && <Alma users={mappedUsers} labels={mappedLabels} milestones={mappedMilestones} />}
                {issues.map((issue) => (
                  <IssueListItem key={issue.id} issueMetaData={getMetaData(issue)} />
                ))}
              </IsQueryContext.Provider>
            </CheckedIssuesContext.Provider>
          </IsCheckAllContext.Provider>
        </AllCheckedContext.Provider>
      </IsMarkAsContext.Provider>
    </div>
  );
};

export default IssueList;
