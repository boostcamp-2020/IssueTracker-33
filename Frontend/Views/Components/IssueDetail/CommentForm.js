import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarkdownRender from '../MarkdownRender';
import ErrorMessage from '../ErrorMessage';

const CommentForm = ({
  issueId,
  commentsData,
  setCommentsData,
  isOpen,
  setIsOpen,
  description,
  setDescription,
  setIsDescription,
  isEdit,
  commentId,
}) => {
  const [comment, setComment] = useState(description);
  const [commentError, setCommentError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setSubmitDisabled(!comment);
  }, [comment]);

  // TODO api 분리
  const postComment = async () => {
    try {
      return await axios.post(
        `${process.env.API_URL}/${process.env.API_VERSION}/comments`,
        {
          description: comment,
          issueId,
        },
        { withCredentials: true },
      );
    } catch (err) {
      // TODO 에러 처리 부분
      console.error(err);
    }
  };

  const patchComment = async () => {
    try {
      return await axios.patch(
        `${process.env.API_URL}/${process.env.API_VERSION}/comments/${commentId}`,
        {
          description: comment,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const patchStatus = async (newStatus) => {
    try {
      return await axios.patch(
        `http://localhost:3000/api/v1/issues/${issueId}/status`,
        {
          isOpen: newStatus,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const createComment = async () => {
    const result = await postComment();
    const [newComment] = result.data.comment;
    setCommentsData([...commentsData, newComment]);
    setComment('');
  };

  const editComment = async () => {
    await patchComment();
    setDescription(comment);
    setIsDescription(true);
  };

  const editStatus = async () => {
    const newStatus = isOpen ? 0 : 1;
    await patchStatus(newStatus);
    setIsOpen(newStatus);
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
    (isEdit ? editComment : createComment)();
    setCommentError(false);
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
          url: `${process.env.API_URL}/${process.env.API_VERSION}/images`,
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

  const onClickCancel = () => {
    (isEdit ? setIsDescription : editStatus)(true);
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
      <button type="button" onClick={onClickCancel}>
        {isEdit ? 'Cancel' : isOpen ? 'Close issue' : 'Reopen issue'}
      </button>
      <button type="submit" onClick={onSubmitComment} disabled={submitDisabled}>
        {isEdit ? 'Update comment' : 'Comment'}
      </button>
      <MarkdownRender comment={comment} />
    </>
  );
};

export default CommentForm;
