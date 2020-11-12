import React, { useState } from 'react';
import styled from 'styled-components';
import NewIssueForm from './NewIssueForm';
import NewIssueOption from '../NewIssueOption';

const NewIssueWrapperWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 30px 100px;
`;

const NewIssueWrapper = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedMiles, setSelectedMiles] = useState([]);

  return (
    <NewIssueWrapperWrapper>
      <NewIssueForm selectedUsers={selectedUsers} selectedLabels={selectedLabels} selectedMiles={selectedMiles} />
      <NewIssueOption
        selectedUsers={selectedUsers}
        selectedLabels={selectedLabels}
        selectedMiles={selectedMiles}
        setSelectedUsers={setSelectedUsers}
        setSelectedLabels={setSelectedLabels}
        setSelectedMiles={setSelectedMiles}
      />
    </NewIssueWrapperWrapper>
  );
};

export default NewIssueWrapper;
