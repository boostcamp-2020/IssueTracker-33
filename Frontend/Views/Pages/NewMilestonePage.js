import React from 'react';
import MilestoneEditor from '../Components/MilestoneEditor';

const NewMilestonePage = () => {
  return (
    <>
      <h1>New Milestone</h1>
      <div>create a new milestone to help organize your issues and pull requests.</div>
      <MilestoneEditor />
    </>
  );
};

export default NewMilestonePage;
