import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckedIssuesContext, IsCheckAllContext, AllCheckedContext, IsMarkAsContext } from './IssueList';

const IssueListItem = ({ issueMetaData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { checkedIssuesDispatch } = useContext(CheckedIssuesContext);
  const { isCheckAll } = useContext(IsCheckAllContext);
  const { allChecked, allCheckedDispatch } = useContext(AllCheckedContext);
  const { isMarkAs } = useContext(IsMarkAsContext);
  const { issue, author, labels, assignees, milestone } = issueMetaData;

  const history = useHistory();

  useEffect(() => {
    setIsChecked(isCheckAll);
  }, [isCheckAll]);

  useEffect(() => {
    if (allChecked) {
      setIsChecked(allChecked);
    }
  }, [allChecked]);

  useEffect(() => {
    if (!isMarkAs) {
      setIsChecked(false);
    }
  }, [isMarkAs]);

  const onCheckIssue = () => {
    if (isChecked === false) {
      setIsChecked(true);
      checkedIssuesDispatch({ type: 'add', data: issue.id });
    } else {
      setIsChecked(false);
      checkedIssuesDispatch({ type: 'filter', option: issue.id });
      allCheckedDispatch({ type: 'set', data: false });
    }
  };

  const onClickTitle = (id) => {
    history.push(`/issues/${id}`);
  };

  return (
    <div>
      <br />
      <div>
        <input key={issue.id} checked={isChecked} type="checkbox" onChange={onCheckIssue} />
        <span onClick={() => onClickTitle(issue.id)}>{issue.title}</span>
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

export default IssueListItem;
