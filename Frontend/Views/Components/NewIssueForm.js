import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewIssueForm = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // api 모듈로 분리
  const postIssue = async () => {
    try {
      return axios.post('http://localhost:3000/api/v1/issues', {
        title,
        comment,
        userId: 1,
        milestoneId: 1,
        labels: [1],
        assignees: [1],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createIssue = async () => {
    const result = await postIssue();
    console.log(result);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createIssue();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    setSubmitDisabled(!(title && comment));
  }, [title, comment]);

  return (
    <div>
      <input type="text" placeholder="Title" onChange={onChangeTitle} />
      <input
        type="text"
        placeholder="Leave a comment"
        onChange={onChangeComment}
      />
      <input
        placeholder="Attach files by selecting here"
        type="file"
        accept="image/png, image/jpeg"
      />
      <button type="button">Cancel</button>
      <button type="submit" onClick={onSubmit} disabled={submitDisabled}>
        Submit new issue
      </button>
    </div>
  );
};

export default NewIssueForm;
