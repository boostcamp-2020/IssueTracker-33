import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const LabelForm = ({ setIsFormVisible, labels, setLabels, isEdit, labelToEdit }) => {
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
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onClickCreate = async () => {
    const LABEL_URL = 'http://localhost:3000/api/v1/labels';
    const postData = {
      name,
      description,
      color,
    };
    try {
      await axios.post(LABEL_URL, postData, { withCredentials: true });
      setLabels([...labels, postData]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClickEdit = async () => {
    const LABEL_URL = 'http://localhost:3000/api/v1/labels';
    const postData = {
      id: labelToEdit.id,
      name,
      description,
      color,
    };
    try {
      await axios.patch(LABEL_URL, postData, { withCredentials: true });
      setLabels(
        labels.map((label) => {
          if (label.id === labelToEdit.id) {
            return Object.assign(label, postData);
          }
          return label;
        }),
      );
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
      <span color={color}>{name}</span>
      <div>
        <label>Label Name</label>
        <input type="text" placeholder="Label name" onChange={onChangeName} value={name} />
        <label>Description</label>
        <input type="text" placeholder="Description (Optional)" onChange={onChangeDescription} value={description} />
        <label>Color</label>
        <button type="button" onClick={onRandomizeColor}>
          돌려
        </button>
        <input type="text" value={color} onChange={onChangeColor} />
        <button type="button" onClick={onClickCancel}>
          Cancel
        </button>
        <button type="button" onClick={onClickSubmit} disabled={isDisabled}>
          {isEdit ? 'Save Changes' : 'Create label'}
        </button>
      </div>
    </>
  );
};

export default LabelForm;
