import React, { useState } from 'react';
import axios from 'axios';

const NewMilestonePage = () => {
  const [inputTitle, setTitle] = useState('');
  const [inputDate, setDate] = useState(null);
  const [inputDescription, setDescription] = useState(null);

  const postMilestone = async () => {
    const MILE_URL = 'http://localhost:3000/api/v1/milestones';
    const postData = {
      title: inputTitle,
      dueDate: inputDate,
      description: inputDescription,
    };
    try {
      await axios.post(MILE_URL, postData, { withCredentials: true });
      window.location.href = 'http://localhost:8000/milestones';
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const canSubmit = () => {
    return !inputTitle;
  };

  return (
    <>
      <h1>New Milestone</h1>
      <div>create a new milestone to help organize your issues and pull requests.</div>
      <div>Title</div>
      <input type="text" placeholder="Title" onChange={onChangeTitle} />
      <div>Due date (optional)</div>
      <input type="date" onChange={onChangeDate} />
      <div>Description (optional)</div>
      <input type="textarea" onChange={onChangeDescription} />
      <button type="button" onClick={postMilestone} disabled={canSubmit()}>
        Create Milestone
      </button>
    </>
  );
};

export default NewMilestonePage;
