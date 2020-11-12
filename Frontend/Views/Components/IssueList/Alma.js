import React from 'react';
import Dropdown from './Dropdown';

const Alma = ({ users, labels, milestones }) => {
  return (
    <>
      <Dropdown name="author" values={users} />
      <Dropdown name="label" values={labels} />
      <Dropdown name="milestone" values={milestones} />
      <Dropdown name="assignee" values={users} />
    </>
  );
};

export default Alma;
