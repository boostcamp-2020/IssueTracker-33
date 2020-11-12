import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import LabelList from '../Components/Label/LabelList';
import LabelForm from '../Components/Label/LabelForm';
import { LabelsContext } from '../store/AppStore';
import LabelMilestoneTabs from '../Components/LabelMilestoneTabs';

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
          <LabelMilestoneTabs />
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
