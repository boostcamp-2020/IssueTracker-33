import React from 'react';
import axios from 'axios';

const Milestone = ({ milestone }) => {
  const MILE_URL = `http://localhost:3000/api/v1/milestones/:${milestone.id}`;

  const box = {
    border: '1px solid',
    width: '200px',
    height: '5px',
  };

  const box2 = {
    width: `${milestone.total && (milestone.closedIssue / milestone.total) * 200}px`,
    height: '5px',
    backgroundColor: 'gray',
  };

  const onOpenCloseToggle = async () => {
    const value = milestone.mileIsOpen ? 0 : 1;
    try {
      await axios.patch(MILE_URL, { isOpen: value }, { withCredentials: true });
      window.location.href = 'http://localhost:8000/milestones';
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  };

  const onEditBtn = async () => {};
  const onDeleteBtn = async () => {};

  return (
    <div>
      <div>{`pk는 ${milestone.id} 제목은 ${milestone.title}`}</div>
      <div>{`전체 이슈: ${milestone.total} 열린 이슈:${milestone.opendIssue} 닫힌 이슈:${milestone.closedIssue}`}</div>
      <div>{milestone.dueDate}</div>
      <div>{milestone.description}</div>
      <div style={box}>
        <div style={box2}> </div>
      </div>

      <button type="button" onClick={onOpenCloseToggle}>
        {milestone.mileIsOpen ? <span>Close</span> : <span>Open</span>}
      </button>
      <button type="button" onClick={onEditBtn}>
        Edit
      </button>
      <button type="button" onClick={onDeleteBtn}>
        Delete
      </button>
    </div>
  );
};

export default Milestone;
