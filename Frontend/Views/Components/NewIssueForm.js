import React, { useState } from 'react';

const NewIssueForm = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 서버에 이슈 POST
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
      <button type="submit" onClick={onSubmit}>
        Submit new issue
      </button>
    </div>
  );
};

export default NewIssueForm;
