import React, { useState } from 'react';
import NewIssueList from './NewIssueList';

const NewIssueDropdown = ({ dropdownTitle, selected, setSelected, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleList = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  return (
    <>
      <div>
        <span>{dropdownTitle}</span>
        <span onClick={onToggleList}>[+]</span>
      </div>

      {isOpen && <NewIssueList setSelected={setSelected} selected={selected} data={[...children]} />}

      <div id={`${dropdownTitle} selected`}>
        {selected?.map((elem) => (
          <span key={elem.id}>{elem.username || elem.name || elem.title}</span>
        ))}
      </div>
    </>
  );
};

export default NewIssueDropdown;
