import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ReloadContext } from '../../store/IssuesPageStore';
import { IsQueryContext } from '../../store/IssuesListStore';
import { randomRGB } from '../../../style/Neon';

const UserImg = styled.img`
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 10px;
`;
const UserItemWrapper = styled.div`
  display: flex;
  padding: 5px;
`;
const UserItem = ({ value }) => {
  return (
    <UserItemWrapper>
      <UserImg src={value.imageLink} alt={value.username} />
      <span>
        <b>{value.username}</b>
      </span>
    </UserItemWrapper>
  );
};

const LabelColor = styled.div`
  background-color: ${(props) => props.color};
  min-width: 20px;
  max-height: 20px;
  border-radius: 10px;
  margin-right: 5px;
`;

const LabelItemWrapper = styled.div`
  display: flex;
  padding: 5px;
`;
const LabelItem = ({ value }) => {
  return (
    <LabelItemWrapper>
      <LabelColor color={value.color} />
      <div>
        <div>
          <b>{value.name}</b>
        </div>
        <div>{value.description}</div>
      </div>
    </LabelItemWrapper>
  );
};

const MilestoneItemWrapper = styled.div`
  padding: 5px;
`;

const MilestoneItem = ({ value }) => {
  return (
    <MilestoneItemWrapper>
      <span>
        <b>{value.title}</b>
      </span>
    </MilestoneItemWrapper>
  );
};

const ChoiceListWrapper = styled.div`
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #ff00de, 0 0 7px #ff00de, 0 0 8px #ff00de, 0 0 10px #ffffff, 0 0 15px #ffffff;
  position: absolute;
  background-color: ${randomRGB()};
  border: 4px solid white;
  color: black;
  border-radius: 5px;
  width: 200px;
  padding: 7px;
  top: 50px;
  right: 0px;
  z-index: 1;
  & :hover {
    color: white;
  }
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
