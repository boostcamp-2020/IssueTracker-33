import React, { useState } from 'react';
import axios from 'axios';

const MilestoneEditor = ({ milestone, setIsEditButtoneClicked }) => {
  const [inputTitle, setTitle] = useState(milestone?.title || null);
  const [inputDate, setDate] = useState(milestone?.dueDate.substring(0, 10) || null);
  const [inputDescription, setDescription] = useState(milestone?.description || null);

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
    const config = { withCredentials: true };
    const postData = {
      title: inputTitle,
      dueDate: inputDate,
      description: inputDescription,
    };
    try {
      if (milestone) {
        const PATCH_MILE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/milestones/${milestone.id}`;
        await axios.patch(PATCH_MILE_URL, postData, config);
      } else {
        const POST_MILE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/milestones`;
        await axios.post(POST_MILE_URL, postData, config);
      }
      window.location.href = `${process.env.WEB_URL}/milestones`;
    } catch (err) {
      window.location.href = process.env.WEB_URL;
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
