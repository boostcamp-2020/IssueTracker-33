import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LabelList from '../Components/LabelList';
import LabelForm from '../Components/LabelForm';

const LabelPage = () => {
  const [labels, setLabels] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(async () => {
    const { data } = await axios.get('http://localhost:3000/api/v1/labels', { withCredentials: true });
    setLabels(data);
  });

  const onToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div>
        <button type="button">Lables</button>
        <button type="button">Milestones</button>
        <button type="button" onClick={onToggleForm}>
          New Label
        </button>
      </div>
      {isFormVisible && <LabelForm />}
      <LabelList labels={labels} />
    </>
  );
};

export default LabelPage;
