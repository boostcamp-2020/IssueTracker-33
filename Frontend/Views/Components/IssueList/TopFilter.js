import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useClickOutside from '../Modal';
import getUserId from '../../../Sources/user';
import { ReloadContext } from '../../store/IssuesPageStore';
import { IsQueryContext } from '../../store/IssuesListStore';

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
    <>
      <div ref={domNode}>
        <button type="button" onClick={onToggleDropdown}>
          Filters
        </button>
        <input type="text" />
        {isVisible && (
          <div>
            <div>Filter Issues</div>
            <div onClick={() => onClickFilter('open=1')}>Open Issues</div>
            <div onClick={() => onClickFilter(`author=${getUserId(document.cookie)}`)}>Your Issues</div>
            <div onClick={() => onClickFilter(`assignee=${getUserId(document.cookie)}`)}>Everything assigned to you</div>
            <div onClick={() => onClickFilter(`mentions=${getUserId(document.cookie)}`)}>Everything mentioning you</div>
            <div onClick={() => onClickFilter('open=0')}>Closed Issues</div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopFilter;
