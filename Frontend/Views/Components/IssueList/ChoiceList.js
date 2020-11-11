import React from 'react';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

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

    let newQuery = {};
    if (oldQuery[name] === id) {
      delete oldQuery[name];
    } else {
      newQuery = {
        ...oldQuery,
        [name]: id,
      };
    }
    const newQueryString = Object.keys(newQuery).reduce((acc, key) => {
      return `${acc}${acc === '' ? '' : '&'}${key}=${newQuery[key]}`;
    }, '');

    history.push(`/issues?${newQueryString}`);
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

export default ChoiceList;
