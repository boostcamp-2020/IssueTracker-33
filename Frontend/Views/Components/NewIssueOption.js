import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewIssueDropdown from './NewIssueDropdown';

const NewIssueOption = () => {
  const [data, setData] = useState(['', '', '']);

  useEffect(async () => {
    const URL1 = 'http://localhost:3000/labels';
    const URL2 = 'http://localhost:3000/milestones';
    const URL3 = 'http://localhost:3000/users';

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);
    const promise3 = axios.get(URL3);

    const results = await Promise.all([promise1, promise2, promise3]);
    setData([results[0].data, results[1].data, results[2].data]);
  }, []);

  return (
    <div>
      <NewIssueDropdown dropdownTitle="Assignees">{data[2]}</NewIssueDropdown>
      <NewIssueDropdown dropdownTitle="Labels">{data[0]}</NewIssueDropdown>
      <NewIssueDropdown dropdownTitle="Milestones">{data[1]}</NewIssueDropdown>
    </div>
  );
};

export default NewIssueOption;
