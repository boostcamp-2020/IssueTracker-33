import React from 'react';
import Dropdown from './Dropdown';

const Alma = ({ users, labels, milestones, setResetQuery }) => {
  return (
    <>
      <Dropdown name="author" values={users} setResetQuery={setResetQuery} />
      <Dropdown name="label" values={labels} setResetQuery={setResetQuery} />
      <Dropdown name="milestone" values={milestones} setResetQuery={setResetQuery} />
      <Dropdown name="assignee" values={users} setResetQuery={setResetQuery} />
    </>
  );
};

export default Alma;
