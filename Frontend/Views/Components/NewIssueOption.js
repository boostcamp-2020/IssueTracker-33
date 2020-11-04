import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewIssueDropdown from './NewIssueDropdown';

const NewIssueOption = ({
  userSelectedData,
  labelSelectedData,
  mileSelectedData,
  setUserSelectedData,
  setLabelSelectedData,
  setMileSelectedData,
}) => {
  const [userData, setUser] = useState('');
  const [labelData, setLabel] = useState('');
  const [mileData, setMile] = useState('');

  useEffect(async () => {
    const USER_URL = 'http://localhost:3000/api/v1/users';
    const LABEL_URL = 'http://localhost:3000/api/v1/labels';
    const MILE_URL = 'http://localhost:3000/api/v1/milestones';

    const userProm = axios.get(USER_URL);
    const labelProm = axios.get(LABEL_URL);
    const mileProm = axios.get(MILE_URL);

    try {
      const [userResolve, labelResolve, mileResolve] = await Promise.all([userProm, labelProm, mileProm]);

      setUser(userResolve.data);
      setLabel(labelResolve.data);
      setMile(mileResolve.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <NewIssueDropdown dropdownTitle="Assignees" selected={userSelectedData} setSelected={setUserSelectedData}>
        {userData}
      </NewIssueDropdown>
      <NewIssueDropdown dropdownTitle="Labels" selected={labelSelectedData} setSelected={setLabelSelectedData}>
        {labelData}
      </NewIssueDropdown>
      <NewIssueDropdown dropdownTitle="Milestones" selected={mileSelectedData} setSelected={setMileSelectedData}>
        {mileData}
      </NewIssueDropdown>
    </div>
  );
};

export default NewIssueOption;
