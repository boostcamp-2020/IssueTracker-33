import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LabelForm from './LabelForm';
import { LabelsContext } from '../../store/AppStore';
import { getRandomColor, isDarkColor } from '../../../Sources/color';

const LabelItemWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--border-gray);
  padding: 20px;
  &:last-child {
    border-bottom: none;
  }
`;

const StatusTag = styled.div`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--font-white);
  background-color: ${(props) => (props.children === 'Open' ? `var(--open-green)` : `var(--closed-red)`)};
`;

const LabelPreview = styled(StatusTag)`
  height: 25px;
  padding: 2px 14px;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.isDarkColor ? 'white' : 'black')};
`;

const LabelItemField = styled.div`
  width: ${(props) => props.width || '150px'};
  display: flex;
  align-items: center;
`;

const LabelListWrapper = styled.div`
  border-radius: 0px 0px 5px 5px;
  border: 1px solid var(--border-gray);
`;

const LabelListTitle = styled.div`
  height: 50px;
  padding: 20px;
  background-color: var(--background-gray);
  border: 1px solid var(--border-gray);
  border-bottom: none;
  border-radius: 5px 5px 0px 0px;
  font-weight: 600;
`;

const LabelList = ({ setIsFormVisible }) => {
  const { labels, labelsDispatch } = useContext(LabelsContext);
  const onClickDelete = async (id) => {
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    try {
      await axios.delete(`${LABEL_URL}/${id}`, { withCredentials: true });
      labelsDispatch({ type: 'delete', target: id });
    } catch (err) {
      console.log('error');
    }
  };

  const LabelItem = ({ label }) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
      <>
        {!isEdit && (
          <LabelItemWrapper>
            <LabelItemField width="20%">
              <LabelPreview isDarkColor={isDarkColor(label.color)} color={label.color}>
                {label.name}
              </LabelPreview>
            </LabelItemField>
            <LabelItemField width="65%">{label.description}</LabelItemField>
            <button type="button" onClick={() => setIsEdit(!isEdit)}>
              Edit
            </button>
            <button type="button" onClick={() => onClickDelete(label.id)}>
              Delete
            </button>
          </LabelItemWrapper>
        )}
        {isEdit && (
          <div>
            <LabelForm isEdit setIsEdit={setIsEdit} labelToEdit={label} setIsFormVisible={setIsFormVisible} />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <LabelListTitle>{`${labels?.length} labels`}</LabelListTitle>
      <LabelListWrapper>{labels && labels.map((label) => <LabelItem key={label.id} label={label} />)}</LabelListWrapper>
    </>
  );
};

export default LabelList;
