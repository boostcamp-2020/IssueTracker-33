import React, { useState } from 'react';
import styled from 'styled-components';
import NewIssueForm from './NewIssueForm';
import NewIssueOption from '../NewIssueOption';

const NewIssueWrapperWrapper = styled.div`
  display: flex;
  padding: 30px;
`;

const NewIssueWrapper = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selecetedMiles, setSelecetedMiles] = useState([]);

  return (
    <NewIssueWrapperWrapper>
      <NewIssueForm selectedUsers={selectedUsers} selectedLabels={selectedLabels} selecetedMiles={selecetedMiles} />
      <NewIssueOption
        selectedUsers={selectedUsers}
        selectedLabels={selectedLabels}
        selecetedMiles={selecetedMiles}
        setSelectedUsers={setSelectedUsers}
        setSelectedLabels={setSelectedLabels}
        setSelecetedMiles={setSelecetedMiles}
      />
    </NewIssueWrapperWrapper>
  );
};

export default NewIssueWrapper;
