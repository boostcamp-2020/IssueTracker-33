import React, { useState } from 'react';
import styled from 'styled-components';
import NewIssueList from './NewIssueList';

const NewIssueDropdownWrapper = styled.div`
  width: 250px;
  position: relative;
  border-bottom: 1px solid var(--border-gray);
  &:last-child {
    border-bottom: none;
  }
`;

const DropdownTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewIssueDropdown = ({ dropdownTitle, selected, setSelected, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleList = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  return (
    <NewIssueDropdownWrapper>
      <DropdownTitle onClick={onToggleList}>
        <span>{dropdownTitle}</span>
        <span>⚙️</span>
      </DropdownTitle>
      {isOpen && <NewIssueList setSelected={setSelected} selected={selected} data={[...children]} />}
      <div id={`${dropdownTitle} selected`}>
        {selected?.map((elem) => (
          <div key={elem.id}>{elem.username || elem.name || elem.title}</div>
        ))}
      </div>
    </NewIssueDropdownWrapper>
  );
};

export default NewIssueDropdown;
