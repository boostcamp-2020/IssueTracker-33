import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Milestone = ({ milestone }) => {
  const [{ total, opendIssues, closedIssues }, setCount] = useState({ total: 0, opendIssues: 0, closedIssues: 0 });

  useEffect(async () => {
    const ISSUE_URL = `http://localhost:3000/api/v1/issues?groupby=milestones&milestoneId=${milestone.id}`;
    try {
      const { data } = await axios.get(ISSUE_URL, { withCredentials: true });

      let totalIssue = 0;
      let opendCnt = 0;
      let closedCnt = 0;
      data.map((elem) => {
        elem.isOpen ? (opendCnt += elem.cnt) : (closedCnt += elem.cnt);
        totalIssue += elem.cnt;
      });
      setCount({ total: totalIssue, opendIssues: opendCnt, closedIssues: closedCnt });
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  }, []);

  const box = {
    border: '1px solid',
    width: '200px',
    height: '5px',
  };

  const box2 = {
    width: `${(closedIssues / total) * 200}px`,
    height: '5px',
    backgroundColor: 'gray',
  };

  return (
    <>
      <div>{`pk는 ${milestone.id} 제목은 ${milestone.title}`}</div>
      <div>{`전체 이슈: ${total} 열린 이슈:${opendIssues} 닫힌 이슈:${closedIssues}`}</div>
      <div>{milestone.dueData}</div>
      <div>{milestone.description}</div>
      <div style={box}>
        <div style={box2}> </div>
      </div>
    </>
  );
};

export default Milestone;
