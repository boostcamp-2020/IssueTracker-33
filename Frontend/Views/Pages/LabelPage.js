import React from 'react';
import { Link } from 'react-router-dom';

const LabelPage = () => {
  return (
    <div>
      <Link to="/labels">labels</Link>
      <Link to="/milestones">milestones</Link>
    </div>
  );
};

export default LabelPage;
