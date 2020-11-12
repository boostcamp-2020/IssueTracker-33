import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReloadContext } from '../../store/IssuesPageStore';
import { IsQueryContext } from '../../store/IssuesListStore';
import styled from 'styled-components';

const UserImg = styled.img`
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};

  width: 20px;
  height: auto;
  border-radius: 10px;
`;
const UserItemWrapper = styled.div`
  display: flex;
`;
const UserItem = ({ value }) => {
  return (
    <UserItemWrapper>
      <UserImg src={value.imageLink} alt={value.username} />
      <span>{value.username}</span>
    </UserItemWrapper>
  );
};

const LabelColor = styled.div`
  background-color: ${(props) => props.color};
  min-width: 20px;
  max-height: 20px;
  border-radius: 10px;
`;

const LabelItemWrapper = styled.div`
  display: flex;
`;
const LabelItem = ({ value }) => {
  return (
    <LabelItemWrapper>
      <LabelColor color={value.color} />
      <div>
        <div>{value.name}</div>
        <div>{value.description}</div>
      </div>
    </LabelItemWrapper>
  );
};

const MilestoneItem = ({ value }) => {
  return (
    <>
      <span>{value.title}</span>
    </>
  );
};

const ChoiceListWrapper = styled.div`
  position: absolute;
  background-color: wheat;
  border-radius: 5px;
  width: 200px;
  padding: 7px;
  top: 50px;
  right: 0px;
  z-index: 1;
`;
const ChoiceList = ({ name, values, onToggleDropdown }) => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { isQueryDispatch } = useContext(IsQueryContext);
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
    isQueryDispatch({ type: 'switch', data: true });
    reloadDispatch({ type: 'switch' });
  };

  return (
    <ChoiceListWrapper>
      <div>{`Filter by ${name}`}</div>
      {Object.keys(values).map((key) => {
        return (
          <div key={key} onClick={() => onSelectAlmaItem(key)}>
            <ItemComponent value={values[key]} />
          </div>
        );
      })}
    </ChoiceListWrapper>
  );
};

export default ChoiceList;
