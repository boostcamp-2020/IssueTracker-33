import React, { useContext, useState } from 'react';
import axios from 'axios';
import LabelForm from './LabelForm';
import { LabelsContext } from '../../store/AppStore';

const LabelList = ({ setIsFormVisible }) => {
  const { labels, labelsDispatch } = useContext(LabelsContext);
  const onClickDelete = async (id) => {
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    try {
      await axios.delete(`${LABEL_URL}/${id}`, { withCredentials: true });
      // setLabels(labels.filter((label) => label.id !== id));
      labelsDispatch({ type: 'delete', target: id });
    } catch (err) {
      console.log('error');
    }
  };

  const LabelItem = ({ label }) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
      <>
        <div>
          <span color={label.color}>{label.name}</span>
          <span>{label.description}</span>
          <button type="button" onClick={() => setIsEdit(!isEdit)}>
            Edit
          </button>
          <button type="button" onClick={() => onClickDelete(label.id)}>
            Delete
          </button>
          {isEdit && <LabelForm isEdit labelToEdit={label} setIsFormVisible={setIsFormVisible} />}
        </div>
      </>
    );
  };

  return (
    <>
      <div>{`${labels.length} labels`}</div>
      {labels.map((label) => (
        <>
          <LabelItem key={label.id} label={label} />
        </>
      ))}
    </>
  );
};

export default LabelList;
