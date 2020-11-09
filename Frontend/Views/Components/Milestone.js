import React from 'react';

const Milestone = ({ milestone }) => {
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

  return (
    <>
      <div>{`pk는 ${milestone.id} 제목은 ${milestone.title}`}</div>
      <div>{`전체 이슈: ${milestone.total} 열린 이슈:${milestone.opendIssue} 닫힌 이슈:${milestone.closedIssue}`}</div>
      <div>{milestone.dueData}</div>
      <div>{milestone.description}</div>
      <div style={box}>
        <div style={box2}> </div>
      </div>
    </>
  );
};

export default Milestone;
