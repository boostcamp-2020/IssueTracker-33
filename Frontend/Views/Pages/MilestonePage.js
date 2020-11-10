import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Milestone from '../Components/Milestone';

const MilestonePage = () => {
  const [milestoneList, setMilestoneList] = useState([]);
  const [whichMile, setWhichMile] = useState(1);

  useEffect(async () => {
    const MILE_URL = 'http://localhost:3000/api/v1/milestones/count';
    try {
      const milesResolve = await axios.get(MILE_URL, { withCredentials: true });
      setMilestoneList([...Object.values(milesResolve.data)]);
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  }, []);

  const onOpenBtnClick = () => {
    setWhichMile(1);
  };
  const onCloseBtnClick = () => {
    setWhichMile(0);
  };

  return (
    <div>
      <Link to="/labels">labels</Link>
      <Link to="/milestones">milestones</Link>
      <Link to="/milestones/new">new Milestone</Link>

      <button type="button" onClick={onOpenBtnClick}>
        Open
      </button>
      <button type="button" onClick={onCloseBtnClick}>
        Close
      </button>

      {milestoneList
        .filter((milestone) => milestone.mileIsOpen === whichMile)
        .map((milestone) => (
          <Milestone key={milestone.id} milestone={milestone} />
        ))}
    </div>
  );
};

export default MilestonePage;
