import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MilestoneList from '../Components/MilestoneList';

const MilestonePage = () => {
  const [allMilestones, setAllMilestones] = useState();

  useEffect(async () => {
    const MILE_URL = 'http://localhost:3000/api/v1/milestones';
    try {
      const milesResolve = await axios.get(MILE_URL, { withCredentials: true });
      setAllMilestones(milesResolve.data);
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  }, []);

  return (
    <div>
      <Link to="/labels">labels</Link>
      <Link to="/milestones">milestones</Link>
      <MilestoneList milestoneList={allMilestones} />
      {console.log(allMilestones)}
    </div>
  );
};

export default MilestonePage;
