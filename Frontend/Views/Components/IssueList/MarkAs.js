import React, { useState, useContext } from 'react';
import axios from 'axios';
import useClickOutside from '../Modal';
import { ReloadContext } from '../../store/IssuesPageStore';
import { CheckedIssuesContext, AllCheckedContext, IsMarkAsContext } from '../../store/IssuesListStore';

const MarkAs = () => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { checkedIssues, checkedIssuesDispatch } = useContext(CheckedIssuesContext);
  const { allCheckedDispatch } = useContext(AllCheckedContext);
  const { isMarkAsDispatch } = useContext(IsMarkAsContext);

  const [isVisible, setIsVisible] = useState(false);

  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const MarkAsList = () => {
    const onChangeStatus = async (status) => {
      const URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues/status`;
      const config = { withCredentials: true };
      const postData = {
        issues: checkedIssues,
        isOpen: status,
      };
      try {
        await axios.patch(URL, postData, config);
        onToggleDropdown();
        isMarkAsDispatch({ type: 'set', data: false });
        allCheckedDispatch({ type: 'set', data: false });
        checkedIssuesDispatch({ type: 'deleteAll' });
        reloadDispatch({ type: 'switch' });
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
        {isVisible && <MarkAsList />}
      </div>
    </>
  );
};

export default MarkAs;
