import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LabelList from '../Components/Label/LabelList';
import LabelForm from '../Components/Label/LabelForm';
import { LabelsContext } from '../store/AppStore';

const LabelPageWrapper = styled.div`
  width: 100%;
  padding: 0px 300px;
`;

const LabelPage = () => {
  const { labels } = useContext(LabelsContext);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <LabelPageWrapper>
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
      </LabelPageWrapper>
    </>
  );
};

export default LabelPage;
