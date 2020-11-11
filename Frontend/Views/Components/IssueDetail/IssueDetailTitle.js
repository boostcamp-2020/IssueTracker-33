import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';

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
    <>
      {isEdit ? (
        <input type="text" placeholder="Title" onChange={onChangeTitle} value={title} />
      ) : (
        <div>
          {title}
          {`#${issueData.id}`}
        </div>
      )}
      {titleError && <ErrorMessage message="제목을 입력해주세요." />}
      <button type="button" onClick={onClickEdit} disabled={editDisabled}>
        {isEdit ? 'save' : 'edit'}
      </button>
      {isEdit && (
        <button type="button" onClick={onClickCancel}>
          cancel
        </button>
      )}
      <div>{isOpen ? 'Open' : 'Close'}</div>
    </>
  );
};

export default IssueDetailTitle;
