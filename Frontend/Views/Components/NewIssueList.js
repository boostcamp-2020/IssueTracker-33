import React from 'react';

const NewIssueList = ({ selected, setSelected, children }) => {
  const clickHandler = (e, child) => {
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
      setSelected(selected.filter((elem) => elem !== child));
    } else {
      setSelected([...selected, child]);
      e.target.classList.add('selected');
    }
  };

  return (
    <div>
      {children.map((child) => (
        <div key={child.id} onClick={(e) => clickHandler(e, child)}>
          {child.username || child.name || child.title}
        </div>
      ))}
    </div>
  );
};

export default NewIssueList;
