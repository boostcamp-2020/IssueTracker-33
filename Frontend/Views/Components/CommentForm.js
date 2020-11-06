import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

const CommentForm = ({ issueId, commentsData, setCommentsData }) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setSubmitDisabled(!comment);
  }, [comment]);

  // TODO api 분리
  const postComment = async () => {
    try {
      return await axios.post('http://localhost:3000/api/v1/comments', {
        description: comment,
        userId: 1,
        issueId,
      });
    } catch (err) {
      // TODO 에러 처리 부분
      console.error(err);
    }
  };

  const createComment = async () => {
    const result = await postComment();
    const [newComment] = result.data.comment;
    setCommentsData([...commentsData, newComment]);
  };

  const onSubmitComment = (e) => {
    let isComment = false;

    if (comment.trim() === '') {
      setCommentError(true);
      isComment = true;
    }
    if (isComment) {
      return;
    }
    e.preventDefault();
    createComment();
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
      <textarea type="text" placeholder="Leave a comment" onChange={onChangeComment} value={comment} />
      <input
        placeholder="Attach files by selecting here"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={onUploadImage}
      />
      {commentError && <ErrorMessage message="본문을 입력해주세요." />}
      {imageError && <ErrorMessage message="이미지 업로드에 실패했습니다." />}
      <button type="button">Close issue</button>
      <button type="submit" onClick={onSubmitComment} disabled={submitDisabled}>
        Comment
      </button>
    </>
  );
};

export default CommentForm;
