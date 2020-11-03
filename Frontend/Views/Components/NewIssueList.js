import React from 'react';

const NewIssueList = ({ selected, setSelected, data }) => {
  const clickHandler = (e, row) => {
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
      setSelected(selected.filter((elem) => elem !== row));
    } else {
      setSelected([...selected, row]);
      e.target.classList.add('selected');
    }
  };

  return (
    <div>
      {data.map((row) => (
        <div key={row.id} onClick={(e) => clickHandler(e, row)}>
          {row.username || row.name || row.title}
        </div>
      ))}
    </div>
  );
};

export default NewIssueList;
