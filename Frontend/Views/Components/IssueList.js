import React, { useEffect, useState } from 'react';

const MarkAs = () => {
  return (
    <>
      <button type="button">Mark as</button>
    </>
  );
};

const UserItem = ({ value }) => {
  return (
    <>
      <img src={value.imageLink} alt={value.username} />
      <span>{value.username}</span>
    </>
  );
};

const LabelItem = ({ value }) => {
  return (
    <>
      <span>{value.color}</span>
      <span>{value.name}</span>
      <span>{value.desc}</span>
    </>
  );
};

const MilestoneItem = ({ value }) => {
  return (
    <>
      <span>{value.title}</span>
    </>
  );
};

const Dropdown = ({ name, values }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  let ItemComponent;
  switch (name) {
    case 'author':
      ItemComponent = UserItem;
      break;
    case 'label':
      ItemComponent = LabelItem;
      break;
    case 'milestone':
      ItemComponent = MilestoneItem;
      break;
    case 'assignee':
      ItemComponent = UserItem;
      break;
    default:
      ItemComponent = null;
  }

  const onSelectAlmaItem = (id) => {
    const oldQueryString = window.location.search;

    let oldQuery = {};
    if (oldQueryString !== '') {
      const querys = oldQueryString.replace('?', '').split('&');
      oldQuery = querys.reduce((acc, query) => {
        const [key, value] = query.split('=');
        return { ...acc, [key]: value };
      }, {});
    }
    const newQuery = {
      ...oldQuery,
      [name]: id,
    };

    const newQueryString = Object.keys(newQuery).reduce((acc, key) => {
      return `${acc}${acc === '' ? '' : '&'}${key}=${newQuery[key]}`;
    }, '');
    window.location.search = `?${newQueryString}`;
  };

  return (
    <>
      <button type="button" onClick={onToggleDropdown}>
        {name}
      </button>
      {isVisible && (
        <>
          <div>{`Filter by ${name}`}</div>
          {Object.keys(values).map((key) => {
            return (
              <div key={key} onClick={() => onSelectAlmaItem(key)}>
                <span>@</span>
                <ItemComponent value={values[key]} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

const Alma = ({ users, labels, milestones }) => {
  return (
    <>
      <Dropdown name="author" values={users} />
      <Dropdown name="label" values={labels} />
      <Dropdown name="milestone" values={milestones} />
      <Dropdown name="assignee" values={users} />
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
      {!isMarkAs && <Alma users={users} labels={labels} milestones={milestones} />}
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
