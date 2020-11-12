import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BasicButton from '../../../style/buttonStyles';
import MarkdownRender from '../MarkdownRender';
import ErrorMessage from '../ErrorMessage';
import { getUserImageLink } from '../../../Sources/user';
import UserPhotoBlock from '../UserPhotoBlock';

const NewIssueFormWrapper = styled.div`
  display: flex;
  > * {
    margin: 0px 10px;
  }
`;

const NewIssueContentWrapper = styled.div`
  border: 1px solid var(--border-gray);
  border-radius: 5px;
  padding: 10px;
`;

const InputMarkdown = styled.div`
  display: flex;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  margin: 10px 10px 10px 0px;
  border: solid 1px var(--border-gray);
  border-radius: 6px;
`;

const ImageInputLabel = styled.label`
  width: 400px;
  height: 30px;
  padding: 6px 4px;
  color: var(--login-gray);
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

const TitleTextarea = styled.input`
  width: 395px;
  padding: 10px;
  border: none;
  border-bottom: dashed 1px var(--border-gray);
  outline: none;
  resize: vertical;
`;

const CommentTextarea = styled.textarea`
  width: 395px;
  min-height: 100px;
  max-height: 500px;
  padding: 10px;
  border: none;
  border-bottom: dashed 1px var(--border-gray);
  outline: none;
  resize: vertical;
`;

const MarkdownBorder = styled.div`
  width: 400px;
  margin: 10px 0;
  border: solid 1px var(--border-gray);
  border-radius: 6px;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled(BasicButton)`
  margin: 0 5px;
`;

const SubmitButton = styled(BasicButton)`
  color: var(--font-white);
  background-color: var(--button-green);
  &:hover {
    background-color: rgba(50, 198, 84, 0.6);
    transition: 0.2s;
  }
`;

const NewIssueForm = ({ selectedUsers, selecetdLabels, selectedMiles }) => {
  const history = useHistory();

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
    const ISSUE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues`;
    const postData = {
      title,
      comment,
      milestoneId: selectedMiles?.map((elem) => elem.id)[0],
      labels: selecetdLabels?.map((elem) => elem.id),
      assignees: selectedUsers?.map((elem) => elem.id),
    };
    try {
      await axios.post(ISSUE_URL, postData, { withCredentials: true });
      // issuesDispatch({type:'add',data:postData})
      window.location.href = `${process.env.WEB_URL}/issues`;
    } catch (err) {
      window.location.href = process.env.WEB_URL;
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
    history.push('/issues');
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
        const result = await axios.post(`${process.env.API_URL}/${process.env.API_VERSION}/images`, datas, {
          'Content-Type': 'multipart/form-data',
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
    history.push('/issues');
  };

  return (
    <NewIssueFormWrapper>
      <UserPhotoBlock imageLink={getUserImageLink(document.cookie)} />
      <NewIssueContentWrapper>
        <InputMarkdown>
          <InputArea>
            <TitleTextarea type="text" placeholder="Title" onChange={onChangeTitle} />
            <CommentTextarea type="text" placeholder="Leave a comment" onChange={onChangeComment} value={comment} />
            <ImageInputLabel>
              <input placeholder="Attach files by selecting here" type="file" accept="image/png, image/jpeg, image/jpg" onChange={onUploadImage} />
              Attach files by clicking here.
            </ImageInputLabel>
          </InputArea>
          <MarkdownBorder>
            <MarkdownRender comment={comment} />
          </MarkdownBorder>
        </InputMarkdown>
        <div>
          {titleError && <ErrorMessage message="제목을 입력해주세요." />}
          {commentError && <ErrorMessage message="본문을 입력해주세요." />}
          {imageError && <ErrorMessage message="이미지 업로드에 실패했습니다." />}
        </div>
        <ButtonWrapper>
          <div />
          <div>
            <CancelButton type="button" onClick={onClickCancel}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" onClick={onSubmitIssue} disabled={submitDisabled}>
              Submit new issue
            </SubmitButton>
          </div>
        </ButtonWrapper>
      </NewIssueContentWrapper>
    </NewIssueFormWrapper>
  );
};

export default NewIssueForm;
