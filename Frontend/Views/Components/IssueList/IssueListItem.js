import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

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
  allChecked,
  isMarkAs,
}) => {
  const [isChecked, setIsChecked] = useState(false);

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
      setCheckedIssues([...checkedIssues, issue.id]);
    } else {
      setIsChecked(false);
      setCheckedIssues(checkedIssues.filter((elem) => elem !== issue.id));
      setAllChecked(false);
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
