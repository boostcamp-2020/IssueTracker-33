import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BasicButton from '../../../style/buttonStyles';
import MarkdownRender from '../MarkdownRender';
import ErrorMessage from '../ErrorMessage';

const CancelButton = styled(BasicButton)`
  margin: 0 5px;
`;

const CommentButton = styled(BasicButton)`
  color: var(--font-white);
  background-color: var(--button-green);
  &:hover {
    background-color: rgba(50, 198, 84, 0.6);
    transition: 0.2s;
  }
`;

const InputMarkdown = styled.div`
  display: flex;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 622px;
  height: 100%;
  margin: 10px;
  border: solid 1px var(--border-gray);
  border-radius: 6px;
`;

const CommentTextarea = styled.textarea`
  width: 620px;
  min-height: 100px;
  max-height: 500px;
  padding: 10px;
  border: none;
  border-bottom: dashed 1px var(--border-gray);
  outline: none;
  resize: vertical;
`;

const ImageInputLabel = styled.label`
  width: 620px;
  height: 30px;
  padding: 6px 4px;
  color: var(--login-gray);
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

const MarkdownBorder = styled.div`
  width: 620px;
  margin: 10px 0;
  border: solid 1px var(--border-gray);
  border-radius: 6px;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentFormPad = styled.div`
  width: 1260px;
  padding: 0 0 10px 0;
`;

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
  const [inputId, setInputId] = useState();

  useEffect(() => {
    setSubmitDisabled(!comment);
  }, [comment]);

  useEffect(() => {
    setInputId(`issue-${issueId}-comment-${commentId}`);
  }, [issueId, commentId]);

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
        `${process.env.API_URL}/${process.env.API_VERSION}/issues/${issueId}/status`,
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
    <CommentFormPad>
      <InputMarkdown>
        <InputArea>
          <CommentTextarea type="text" placeholder="Leave a comment" onChange={onChangeComment} value={comment} />
          <ImageInputLabel htmlFor={inputId}>
            <input
              placeholder="Attach files by selecting here"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id={inputId}
              onChange={onUploadImage}
            />
            Attach files by clicking here.
          </ImageInputLabel>
        </InputArea>
        <MarkdownBorder>
          <MarkdownRender comment={comment} />
        </MarkdownBorder>
      </InputMarkdown>
      {commentError && <ErrorMessage message="본문을 입력해주세요." />}
      {imageError && <ErrorMessage message="이미지 업로드에 실패했습니다." />}
      <ButtonWrapper>
        <CancelButton type="button" onClick={onClickCancel}>
          {isEdit ? 'Cancel' : isOpen ? 'Close issue' : 'Reopen issue'}
        </CancelButton>
        <CommentButton type="submit" onClick={onSubmitComment} disabled={submitDisabled}>
          {isEdit ? 'Update comment' : 'Comment'}
        </CommentButton>
      </ButtonWrapper>
    </CommentFormPad>
  );
};

export default CommentForm;
