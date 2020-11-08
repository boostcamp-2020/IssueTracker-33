import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useClickOutside from './Modal';

const MarkAs = ({ checkedIssues, reloadIssue, setIsMarkAs }) => {
  const [isVisible, setIsVisible] = useState(false);

  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const MarkAsList = () => {
    const onChangeStatus = async (status) => {
      try {
        await axios.patch(
          'http://localhost:3000/api/v1/issues/status',
          {
            issues: checkedIssues,
            isOpen: status,
          },
          { withCredentials: true },
        );
        onToggleDropdown();
        setIsMarkAs(false);
        reloadIssue();
      } catch (err) {
        console.log('error');
      }
    };

    return (
      <>
        <div>Actions</div>
        <div onClick={() => onChangeStatus(1)}>Open</div>
        <div onClick={() => onChangeStatus(0)}>Closed</div>
      </>
    );
  };

  return (
    <>
      <div ref={domNode}>
        <button type="button" onClick={onToggleDropdown}>
          Mark as
        </button>
        {isVisible && <MarkAsList checkedIssues={checkedIssues} reloadIssue={reloadIssue} />}
      </div>
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

const ChoiceList = ({ name, values, reloadIssue, onToggleDropdown, setResetQuery }) => {
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
    window.history.pushState({}, '', `/issues?${newQueryString}`);
    onToggleDropdown();
    setResetQuery(true);
    reloadIssue();
  };

  return (
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
  );
};

const Dropdown = ({ name, values, reloadIssue, setResetQuery }) => {
  const [isVisible, setIsVisible] = useState(false);

  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div ref={domNode}>
        <button type="button" onClick={onToggleDropdown}>
          {name}
        </button>
        {isVisible && (
          <ChoiceList
            name={name}
            values={values}
            reloadIssue={reloadIssue}
            onToggleDropdown={onToggleDropdown}
            setResetQuery={setResetQuery}
          />
        )}
      </div>
    </>
  );
};

const Alma = ({ users, labels, milestones, reloadIssue, setResetQuery }) => {
  return (
    <>
      <Dropdown name="author" values={users} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      <Dropdown name="label" values={labels} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      <Dropdown name="milestone" values={milestones} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      <Dropdown name="assignee" values={users} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
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

const IssueList = ({ issues, users, labels, milestones, reloadIssue }) => {
  const [checkedIssues, setCheckedIssues] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [isMarkAs, setIsMarkAs] = useState(false);

  const [resetQuery, setResetQuery] = useState(false);

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

  // TODO: 최초 진입이 쿼리스트링일 때는 resetQuery가 true여야 함.
  const onClickReset = () => {
    setResetQuery(false);
    window.history.pushState({}, '', `/issues`);
    reloadIssue();
  };

  return (
    <div>
      {resetQuery && (
        <button type="button" onClick={onClickReset}>
          Clear current search query, filters, and sorts
        </button>
      )}
      <input type="checkbox" onChange={onCheckAll} checked={allChecked} />
      {isMarkAs && <MarkAs reloadIssue={reloadIssue} checkedIssues={checkedIssues} setIsMarkAs={setIsMarkAs} />}
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
          allCheckValue={allChecked}
        />
      ))}
    </div>
  );
};

export default IssueList;
