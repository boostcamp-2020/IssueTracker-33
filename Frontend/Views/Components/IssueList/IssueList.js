import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import IssueListItem from './IssueListItem';
import TopFilter from './TopFilter';
import MarkAs from './MarkAs';
import Alma from './Alma';
import { MilestonesContext, LabelsContext, UsersContext } from '../../store/AppStore';
import { IssuesContext, ReloadContext } from '../../store/IssuesPageStore';
import {
  isQueryReducer,
  checkedIssuesReducer,
  isCheckAllReducer,
  allCheckedReducer,
  isMarkAsReducer,
  IsQueryContext,
  CheckedIssuesContext,
  IsCheckAllContext,
  AllCheckedContext,
  IsMarkAsContext,
} from '../../store/IssuesListStore';
import { CustomButton, randomRGB } from '../../../style/Neon';

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${randomRGB()};
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const FilterStyle = styled.div`
  display: flex;
  align-items: center;
`;

const AlmaStyle = styled.div`
  display: flex;
`;
const IssueList = () => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { issues } = useContext(IssuesContext);
  const { users } = useContext(UsersContext);
  const { labels } = useContext(LabelsContext);
  const { milestones } = useContext(MilestonesContext);

  const [fullfilled, setFullfilled] = useState(false);

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

  const toKeyValueMap = (records) => {
    if (!records) return;
    const map = {};
    records.forEach((record) => {
      map[record.id] = record;
    });
    return map;
  };
  const mappedUsers = toKeyValueMap(users);
  const mappedLabels = toKeyValueMap(labels);
  const mappedMilestones = toKeyValueMap(milestones);
  const getMetaData = (issue) => {
    return {
      issue,
      author: mappedUsers[issue.userId],
      labels: issue.labels?.map((id) => mappedLabels[id]),
      assignees: issue.assignees?.map((id) => mappedUsers[id]),
      milestone: mappedMilestones[issue.milestoneId],
    };
  };

  useEffect(() => {
    if (issues.leg) {
      setFullfilled(true);
    }
  }, [issues, labels, milestones, users]);

  return (
    <div>
      <IsMarkAsContext.Provider value={{ isMarkAs, isMarkAsDispatch }}>
        <AllCheckedContext.Provider value={{ allChecked, allCheckedDispatch }}>
          <IsCheckAllContext.Provider value={{ isCheckAll }}>
            <CheckedIssuesContext.Provider value={{ checkedIssues, checkedIssuesDispatch }}>
              <IsQueryContext.Provider value={{ isQueryDispatch }}>
                <Tab>
                  <FilterStyle>
                    <input type="checkbox" onChange={onCheckAll} checked={allChecked} />
                    <TopFilter />
                  </FilterStyle>
                  <AlmaStyle>
                    {isMarkAs && <MarkAs />}
                    {!isMarkAs && <Alma users={mappedUsers} labels={mappedLabels} milestones={mappedMilestones} />}
                  </AlmaStyle>
                </Tab>
                {isQuery && <CustomButton onClick={onClickReset}>Clear current search query, filters, and sorts</CustomButton>}
                {fullfilled && issues.map((issue) => <IssueListItem key={issue.id} issueMetaData={getMetaData(issue)} />)}
              </IsQueryContext.Provider>
            </CheckedIssuesContext.Provider>
          </IsCheckAllContext.Provider>
        </AllCheckedContext.Provider>
      </IsMarkAsContext.Provider>
    </div>
  );
};

export default IssueList;
