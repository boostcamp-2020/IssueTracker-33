import React, { useContext } from 'react';
import NewIssueDropdown from './NewIssue/NewIssueDropdown';
import { UsersContext, LabelsContext, MilestonesContext } from '../store/AppStore';

const NewIssueOption = ({ selectedUsers, selectedLabels, selectedMiles, setSelectedUsers, setSelectedLabels, setSelectedMiles }) => {
  const { users } = useContext(UsersContext);
  const { labels } = useContext(LabelsContext);
  const { milestones } = useContext(MilestonesContext);

  return (
    <div>
      <NewIssueDropdown dropdownTitle="Assignees" selected={selectedUsers} setSelected={setSelectedUsers}>
        {users}
      </NewIssueDropdown>
      <NewIssueDropdown dropdownTitle="Labels" selected={selectedLabels} setSelected={setSelectedLabels}>
        {labels}
      </NewIssueDropdown>
      <NewIssueDropdown dropdownTitle="Milestones" selected={selectedMiles} setSelected={setSelectedMiles}>
        {milestones}
      </NewIssueDropdown>
    </div>
  );
};

export default NewIssueOption;
