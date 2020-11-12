import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage';
import BasicButton from '../../../style/buttonStyles';

const IssueDetailTitlePad = styled.div`
  margin: 10px;
`;

const IssueDetailHeader = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IssueNumber = styled.span`
  margin: 0 0 0 10px;
  color: var(--login-gray);
`;

const CancelButton = styled(BasicButton)`
  margin: 0 0 0 5px;
`;

const StatusTag = styled.div`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--font-white);
  background-color: ${(props) => (props.children === 'Open' ? `var(--open-green)` : `var(--closed-red)`)};
`;

const TitleInput = styled.input`
  width: 900px;
  padding: 10px;
  &:focus {
    border: none;
    outline: solid 2px var(--tab-blue);
  }
`;

const IssueDetailTitle = ({ issueData, isOpen }) => {
  const [title, setTitle] = useState();
  const [beforeTitle, setBeforeTitle] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [editDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (issueData) setTitle(issueData.title);
  }, [issueData]);

  useEffect(() => {
    setDisabled(!title);
  }, [title]);

  const patchTitle = async () => {
    const ISSUE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues/${issueData.id}/title`;
    try {
      return await axios.patch(ISSUE_URL, { title }, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  };

  const editTitle = async () => {
    await patchTitle();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onClickEdit = () => {
    if (isEdit) {
      let isTitle = false;

      if (title.trim() === '') {
        setTitleError(true);
        isTitle = true;
      }
      if (isTitle) return;

      editTitle();
      setTitleError(false);
    }
    if (!isEdit) setBeforeTitle(title);
    setIsEdit(!isEdit);
  };

  const onClickCancel = () => {
    setTitle(beforeTitle);
    setIsEdit(false);
  };

  return (
    <IssueDetailTitlePad>
      <IssueDetailHeader>
        {isEdit ? (
          <TitleInput type="text" placeholder="Title" onChange={onChangeTitle} value={title} />
        ) : (
          title && (
            <h1>
              <span>{title}</span>
              <IssueNumber>{`#${issueData.id}`}</IssueNumber>
            </h1>
          )
        )}
        <div>
          <BasicButton type="button" onClick={onClickEdit} disabled={editDisabled}>
            {isEdit ? 'Save' : 'Edit'}
          </BasicButton>
          {isEdit && (
            <CancelButton type="button" onClick={onClickCancel}>
              Cancel
            </CancelButton>
          )}
        </div>
      </IssueDetailHeader>
      {titleError && <ErrorMessage message="제목을 입력해주세요." />}
      {(isOpen === 0 || isOpen === 1) && <StatusTag>{isOpen ? 'Open' : 'Closed'}</StatusTag>}
    </IssueDetailTitlePad>
  );
};

export default IssueDetailTitle;
