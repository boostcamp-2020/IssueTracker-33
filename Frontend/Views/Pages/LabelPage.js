import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LabelList from '../Components/Label/LabelList';
import LabelForm from '../Components/Label/LabelForm';
import { LabelsContext } from '../store/AppStore';

const LabelPage = () => {
  const { labels } = useContext(LabelsContext);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div>
        <Link to="/labels">
          <button type="button">Lables</button>
        </Link>
        <Link to="/milestones">
          <button type="button">Milestones</button>
        </Link>
        <button type="button" onClick={onToggleForm}>
          New Label
        </button>
      </div>
      {isFormVisible && <LabelForm setIsFormVisible={setIsFormVisible} />}
      <LabelList labels={labels} setIsFormVisible={setIsFormVisible} />
    </>
  );
};

export default LabelPage;
