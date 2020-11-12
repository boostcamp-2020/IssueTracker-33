import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Milestone from '../Components/Milestone/Milestone';
import LabelMilestoneTabs from '../Components/LabelMilestoneTabs';

const MilestonePage = () => {
  const [milestoneList, setMilestoneList] = useState([]);
  const [whichMile, setWhichMile] = useState(1);

  useEffect(async () => {
    const MILE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/milestones/count`;
    try {
      const milesResolve = await axios.get(MILE_URL, { withCredentials: true });
      setMilestoneList([...Object.values(milesResolve.data)]);
    } catch (err) {
      window.location.href = process.env.WEB_URL;
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
      <LabelMilestoneTabs />
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
