import React from 'react';
import Dropdown from './Dropdown';

const Alma = ({ users, labels, milestones, reloadIssue, setResetQuery }) => {
  return (
    <>
      <Dropdown name="author" values={users} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      <Dropdown name="label" values={labels} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      <Dropdown name="milestone" values={milestones} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
      <Dropdown name="assignee" values={users} reloadIssue={reloadIssue} setResetQuery={setResetQuery} />
    </>
  );
};

export default Alma;
