import React, { useState } from 'react';
import styled from 'styled-components';
import BasicButton from '../../../style/buttonStyles';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentWrapperDiv = styled.div`
  margin: 10px 10px;
  border: ${(props) => (props.isOwner ? 'solid 1px rgba(3, 102, 214, 0.2)' : 'solid 1px var(--border-gray)')};
  border-radius: 6px;
`;

const CommentWrapperHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  border-bottom: ${(props) => (props.isOwner ? 'solid 1px rgba(3, 102, 214, 0.2)' : 'solid 1px var(--border-gray)')};
  background-color: ${(props) => (props.isOwner ? 'var(--owner-blue)' : 'var(--background-gray)')};
`;

const EditButton = styled(BasicButton)`
  border: none;
  background-color: ${(props) => (props.isOwner ? 'var(--owner-blue)' : 'var(--background-gray)')};
  &:hover {
    font-weight: 600;
    color: var(--header-black);
    background-color: inherit;
    transition: 0.2s;
  }
`;

const CommentWrapper = ({ comment, isOwner, isWriter }) => {
  const [description, setDescription] = useState(comment.description);
  const [isDescription, setIsDescription] = useState(true);

  const onClickEdit = () => {
    setIsDescription(false);
  };

  return (
    <CommentWrapperDiv isOwner={isOwner}>
      <CommentWrapperHeader isOwner={isOwner}>
        {isWriter && (
          <EditButton type="button" onClick={onClickEdit}>
            Edit
          </EditButton>
        )}
      </CommentWrapperHeader>
      {isDescription ? (
        <Comment description={description} />
      ) : (
        <CommentForm
          description={description}
          setDescription={setDescription}
          setIsDescription={setIsDescription}
          isEdit
          commentId={comment.id}
        />
      )}
    </CommentWrapperDiv>
  );
};

export default CommentWrapper;
