import React, { Fragment, useEffect, useState } from 'react';
import { isStyledComponent } from 'styled-components';

const NewIssueDropdown = ({ dropdownTitle, children }) => {
  const [test, setTest] = useState('not yet');
  const [isOpen, setIsOpen] = useState(false);

  const layer = {
    backgroundColor: 'aqua',
  };

  const names = [...children];
  const listItem = names.map((name) => <div key={name.id}>{name.id}</div>);

  const clickHandler = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <>
      <span>{dropdownTitle}</span>
      <div onClick={clickHandler} className="m">
        [+]
      </div>
      {isOpen && <div style={layer}>{listItem}</div>}
      <div id={`${dropdownTitle} selected`}>{test}</div>
    </>
  );
};

export default NewIssueDropdown;
