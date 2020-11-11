import React, { useState } from 'react';
import axios from 'axios';
import useClickOutside from '../Modal';

const MarkAs = ({ checkedIssues, reloadIssue, setIsMarkAs, setAllChecked }) => {
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
        setAllChecked(false);
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

export default MarkAs;
