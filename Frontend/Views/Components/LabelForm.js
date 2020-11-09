import React, { useState } from 'react';

const LabelForm = () => {
  const [name, setName] = useState('Label preview');
  return (
    <>
      <span>{name}</span>
      <div>
        <label>Label Name</label>
        <input type="text" placeholder="Label name" />
      </div>
    </>
  );
};

export default LabelForm;
