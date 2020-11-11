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
    const USER_URL = `${process.env.API_URL}/${process.env.API_VERSION}/users`;
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    const MILE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/milestones`;

    const userProm = axios.get(USER_URL, { withCredentials: true });
    const labelProm = axios.get(LABEL_URL, { withCredentials: true });
    const mileProm = axios.get(MILE_URL, { withCredentials: true });

    try {
      const [userResolve, labelResolve, mileResolve] = await Promise.all([userProm, labelProm, mileProm]);
      setUser(userResolve.data);
      setLabel(labelResolve.data);
      setMile(mileResolve.data);
    } catch (err) {
      window.location.href = process.env.WEB_URL;
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
