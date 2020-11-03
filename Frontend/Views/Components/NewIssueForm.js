import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ErrorMessage = ({ message }) => {
  return (
    <>
      <div>{message}</div>
    </>
  );
};

const NewIssueForm = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [commentError, setCommentError] = useState(false);

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
    let isTitle = false;
    let isComment = false;
    // title, comment 을 받아서 trim 후 스페이스 뿐이라면 에러 메시지 출력
    if (title.trim() === '') {
      setTitleError(true);
      isTitle = true;
    }
    if (comment.trim() === '') {
      setCommentError(true);
      isComment = true;
    }
    if (isTitle || isComment) {
      return;
    }
    e.preventDefault();
    createIssue();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Title" onChange={onChangeTitle} />
      {titleError && <ErrorMessage message="제목을 입력해주세요." />}
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
      {commentError && <ErrorMessage message="본문을 입력해주세요." />}
      <button type="button">Cancel</button>
      <button type="submit" onClick={onSubmit}>
        Submit new issue
      </button>
    </div>
  );
};

export default NewIssueForm;
