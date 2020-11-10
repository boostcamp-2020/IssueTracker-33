import React, { useState } from 'react';
import axios from 'axios';

const MilestoneEditor = ({ milestone, setIsEditButtoneClicked }) => {
  const [inputTitle, setTitle] = useState(milestone?.title || '');
  const [inputDate, setDate] = useState(milestone?.dueDate.substring(0, 10) || '');
  const [inputDescription, setDescription] = useState(milestone?.description || '');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onClickCancel = () => {
    setIsEditButtoneClicked(false);
  };

  const canSubmit = () => {
    return !inputTitle;
  };

  const onClickSubmit = async () => {
    const POST_MILE_URL = 'http://localhost:3000/api/v1/milestones';
    const PATCH_MILE_URL = `http://localhost:3000/api/v1/milestones/${milestone.id}`;
    const config = { withCredentials: true };
    const postData = {
      title: inputTitle,
      dueDate: inputDate,
      description: inputDescription,
    };
    try {
      if (milestone) await axios.patch(PATCH_MILE_URL, postData, config);
      else await axios.post(POST_MILE_URL, postData, config);
      window.location.href = 'http://localhost:8000/milestones';
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  };

  return (
    <>
      <div>Title</div>
      <input type="text" placeholder="Title" value={inputTitle} onChange={onChangeTitle} />
      <div>Due date (optional)</div>
      <input type="date" onChange={onChangeDate} value={inputDate || null} />
      <div>Description (optional)</div>
      <input type="textarea" onChange={onChangeDescription} value={inputDescription || null} />

      <button type="button" onClick={onClickCancel} disabled={canSubmit()}>
        Cancel
      </button>
      <button type="button" onClick={onClickSubmit} disabled={canSubmit()}>
        {milestone ? <span>Change</span> : <span>Create Milestone</span>}
      </button>
    </>
  );
};

export default MilestoneEditor;
