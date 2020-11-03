import React, { useState } from 'react';
import NewIssueList from './NewIssueList';

const NewIssueDropdown = ({ dropdownTitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const clickHandler = () => (isOpen ? setIsOpen(false) : setIsOpen(true));
  return (
    <>
      <span>{dropdownTitle}</span>
      <div onClick={clickHandler}>[+]</div>
      {isOpen && (
        <NewIssueList setSelected={setSelected} selected={selected}>
          {[...children]}
        </NewIssueList>
      )}
      <div id={`${dropdownTitle} selected`}>
        {selected.map((elem) => (
          <span key={elem.id}>{elem.username || elem.name || elem.title}</span>
        ))}
      </div>
    </>
  );
};

export default NewIssueDropdown;
