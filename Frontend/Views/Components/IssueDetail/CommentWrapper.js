import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentWrapper = ({ comment, isOwner }) => {
  const [description, setDescription] = useState(comment.description);
  const [isDescription, setIsDescription] = useState(true);

  const onClickEdit = () => {
    setIsDescription(false);
  };

  return (
    <>
      <button type="button" onClick={onClickEdit}>
        edit
      </button>
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
    </>
  );
};

export default CommentWrapper;
