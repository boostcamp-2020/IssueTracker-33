import React, { useState } from 'react';
import NewIssueForm from './NewIssueForm';
import NewIssueOption from '../NewIssueOption';

const NewIssueWrapper = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selecetedMiles, setSelecetedMiles] = useState([]);

  return (
    <>
      <NewIssueForm selectedUsers={selectedUsers} selectedLabels={selectedLabels} selecetedMiles={selecetedMiles} />
      <NewIssueOption
        selectedUsers={selectedUsers}
        selectedLabels={selectedLabels}
        selecetedMiles={selecetedMiles}
        setSelectedUsers={setSelectedUsers}
        setSelectedLabels={setSelectedLabels}
        setSelecetedMiles={setSelecetedMiles}
      />
    </>
  );
};

export default NewIssueWrapper;
