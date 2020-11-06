import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

const NewIssueForm = ({ userSelectedData, labelSelectedData, mileSelectedData }) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setSubmitDisabled(!(title && comment));
  }, [title, comment]);

  const pushIssue = async () => {
    const ISSUE_URL = 'http://localhost:3000/api/v1/issues';
    const postData = {
      title,
      comment,
      userId: 1,
      milestoneId: mileSelectedData.map((elem) => elem.id)[0],
      labels: labelSelectedData.map((elem) => elem.id),
      assignees: userSelectedData.map((elem) => elem.id),
    };
    try {
      await axios.post(ISSUE_URL, postData, { withCredentials: true });
      window.location.href = 'http://localhost:8000/issues';
    } catch (err) {
      window.location.href = 'http://localhost:8000';
    }
  };

  const onSubmitIssue = (e) => {
    let isTitle = false;
    let isComment = false;

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
    pushIssue();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onUploadImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const datas = new FormData();
      datas.append('image', image, image.name);
      try {
        const result = await axios({
          method: 'post',
          url: 'http://localhost:3000/api/v1/images',
          data: datas,
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        setImageError(false);
        setComment(`${comment}\n![image](${result.data.imageLink})`);
      } catch (err) {
        setImageError(true);
      }
    }
  };

  return (
    <>
      <input type="text" placeholder="Title" onChange={onChangeTitle} />
      {titleError && <ErrorMessage message="제목을 입력해주세요." />}
      <textarea type="text" placeholder="Leave a comment" onChange={onChangeComment} value={comment} />
      <input
        placeholder="Attach files by selecting here"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={onUploadImage}
      />
      {commentError && <ErrorMessage message="본문을 입력해주세요." />}
      {imageError && <ErrorMessage message="이미지 업로드에 실패했습니다." />}
      <button type="button">Cancel</button>
      <button type="submit" onClick={onSubmitIssue} disabled={submitDisabled}>
        Submit new issue
      </button>
    </>
  );
};

export default NewIssueForm;
