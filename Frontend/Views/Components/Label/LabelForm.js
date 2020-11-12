import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getRandomColor, isDarkColor } from '../../../Sources/color';
import { LabelsContext } from '../../store/AppStore';
import SyncOutlinedIcon from '@material-ui/icons/SyncOutlined';
import styled from 'styled-components';

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
  margin-bottom: 20px;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.isDarkColor ? 'white' : 'black')};
`;

const LabelFormWrapper = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid var(--border-gray);
  background-color: var(--background-gray);
`;

const LabelInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-end;
`;

const ColorChangeButton = styled.button`
  background-color: ${(props) => props.color};
  color: ${(props) => (props.isDarkColor ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
`;

const InputDiv = styled.div`
  width: ${(props) => props.width || '150px'};
  margin-right: 30px;
  input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid var(--border-gray);
  }
  div {
    font-weight: 500;
  }
`;

const ColorInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LabelForm = ({ setIsFormVisible, isEdit, labelToEdit, setIsEdit }) => {
  const { labelsDispatch } = useContext(LabelsContext);
  const [name, setName] = useState('');
  const [color, setColor] = useState(getRandomColor());
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isEdit) {
      setName(labelToEdit.name);
      setColor(labelToEdit.color);
      setDescription(labelToEdit.description);
    }
  }, []);

  useEffect(() => {
    const colorRegex = /^(#)((?:[A-Fa-f0-9]{3}){1,2})$/;
    if (name.trim() === '' || !color.match(colorRegex)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, color]);

  const onRandomizeColor = () => {
    setColor(getRandomColor());
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onClickCancel = () => {
    setIsFormVisible(false);
    setName('');
    setDescription('');
    setIsEdit(false);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onClickCreate = async () => {
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    const postData = {
      name,
      description,
      color,
    };
    try {
      // TODO: 넣은 행에 대한 InsertId 받아오기
      const { data } = await axios.post(LABEL_URL, postData, { withCredentials: true });
      labelsDispatch({ type: 'add', data: { ...postData, id: data.insertId } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClickEdit = async () => {
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    const postData = { name, description, color };

    try {
      await axios.patch(`${LABEL_URL}/${labelToEdit.id}`, postData, { withCredentials: true });
      labelsDispatch({ type: 'targetUpdate', data: postData, target: labelToEdit.id });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClickSubmit = () => {
    if (isEdit) {
      onClickEdit();
    } else {
      onClickCreate();
    }
    setIsFormVisible(false);
  };

  return (
    <>
      <LabelFormWrapper>
        <LabelPreview isDarkColor={isDarkColor(color)} color={color}>
          {name || 'Label preview'}
        </LabelPreview>
        <LabelInputWrapper>
          <InputDiv width="20%">
            <div>Label Name</div>
            <input type="text" placeholder="Label name" onChange={onChangeName} value={name} />
          </InputDiv>
          <InputDiv width="40%">
            <div>Description</div>
            <input
              type="text"
              placeholder="Description (Optional)"
              onChange={onChangeDescription}
              value={description}
            />
          </InputDiv>
          <InputDiv width="15%">
            <div>Color</div>
            <ColorInputWrapper>
              <ColorChangeButton
                isDarkColor={isDarkColor(color)}
                color={color}
                type="button"
                onClick={onRandomizeColor}
              >
                <SyncOutlinedIcon style={{ fontSize: 20 }} />
              </ColorChangeButton>
              <input type="text" value={color} onChange={onChangeColor} />
            </ColorInputWrapper>
          </InputDiv>
          <InputDiv>
            <button type="button" onClick={onClickCancel}>
              Cancel
            </button>
            <button type="button" onClick={onClickSubmit} disabled={isDisabled}>
              {isEdit ? 'Save Changes' : 'Create label'}
            </button>
          </InputDiv>
        </LabelInputWrapper>
      </LabelFormWrapper>
    </>
  );
};

export default LabelForm;
