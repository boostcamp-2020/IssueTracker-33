import React, { useState } from 'react';
import styled from 'styled-components';
import NewIssueList from './NewIssueList';

const NewIssueDropdownWrapper = styled.div`
  width: 220px;
  position: relative;
  border-bottom: 1px solid var(--border-gray);
  &:last-child {
    border-bottom: none;
  }
  padding: 5px 0px;
  font-size: 14px;
  font-weight: 500;
  color: #586069;
`;

const DropdownTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: var(--tab-blue);
  }
  cursor: pointer;
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
        {selected.length === 0 ? 'None yet' : selected.map((elem) => <div key={elem.id}>{elem.username || elem.name || elem.title}</div>)}
      </div>
    </NewIssueDropdownWrapper>
  );
};

export default NewIssueDropdown;
