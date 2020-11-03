import React, { useState } from 'react';
import NewIssueList from './NewIssueList';

const NewIssueDropdown = ({ dropdownTitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const clickHandler = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  return (
    <>
      <div>
        <span>{dropdownTitle}</span>
        <span onClick={clickHandler}>[+]</span>
      </div>

      {isOpen && <NewIssueList setSelected={setSelected} selected={selected} data={[...children]} />}

      <div id={`${dropdownTitle} selected`}>
        {selected.map((e) => (
          <span key={e.id}>{e.username || e.name || e.title}</span>
        ))}
      </div>
    </>
  );
};

export default NewIssueDropdown;
