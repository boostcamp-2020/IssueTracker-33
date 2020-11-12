import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useClickOutside from '../Modal';
import { getUserId } from '../../../Sources/user';
import { ReloadContext } from '../../store/IssuesPageStore';
import { IsQueryContext } from '../../store/IssuesListStore';
import { randomRGB, CustomButton } from '../../../style/Neon';

const TopFilterWrapper = styled.div`
  position: relative;
`;

const FilterWrapper = styled.div`
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #ff00de, 0 0 7px #ff00de, 0 0 8px #ff00de, 0 0 10px #ff00de, 0 0 15px #ff00de;
  position: absolute;
  background-color: ${randomRGB()};
  border: 4px solid white;
  color: black;
  border-radius: 5px;
  width: 250px;
  padding: 7px;
  top: 50px;
  right: 0px;
  z-index: 1;
  & :hover {
    color: white;
  }
`;

const TopFilter = () => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { isQueryDispatch } = useContext(IsQueryContext);

  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();
  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const onClickFilter = (queryString) => {
    history.push(`/issues?${queryString}`);
    onToggleDropdown();
    isQueryDispatch({ type: 'switch', data: true });
    reloadDispatch({ type: 'switch' });
  };

  return (
    <TopFilterWrapper>
      <div ref={domNode}>
        <CustomButton onClick={onToggleDropdown}>Filters</CustomButton>
        <input type="text" />
        {isVisible && (
          <FilterWrapper>
            <div>Filter Issues</div>
            <div onClick={() => onClickFilter('open=1')}>
              <b>Open Issues</b>
            </div>
            <div onClick={() => onClickFilter(`author=${getUserId(document.cookie)}`)}>
              <b>Your Issues</b>
            </div>
            <div onClick={() => onClickFilter(`assignee=${getUserId(document.cookie)}`)}>
              <b>Everything assigned to you</b>
            </div>
            <div onClick={() => onClickFilter(`mentions=${getUserId(document.cookie)}`)}>
              <b>Everything mentioning you</b>
            </div>
            <div onClick={() => onClickFilter('open=0')}>
              <b>Closed Issues</b>
            </div>
          </FilterWrapper>
        )}
      </div>
    </TopFilterWrapper>
  );
};

export default TopFilter;
