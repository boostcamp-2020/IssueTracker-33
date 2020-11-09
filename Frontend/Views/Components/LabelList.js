import React from 'react';

const LabelList = ({ labels }) => {
  return (
    <>
      <div>{labels.length} labels</div>
      {labels.map((label) => (
        <>
          <div>
            <span color={label.color}>{label.name}</span>
            <span>{label.desc}</span>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
          </div>
        </>
      ))}
    </>
  );
};

export default LabelList;
