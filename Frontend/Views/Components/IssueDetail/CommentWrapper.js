import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentWrapper = ({ comment, isOwner, isWriter }) => {
  const [description, setDescription] = useState(comment.description);
  const [isDescription, setIsDescription] = useState(true);

  const onClickEdit = () => {
    setIsDescription(false);
  };

  return (
    <>
      {isWriter && (
        <button type="button" onClick={onClickEdit}>
          edit
        </button>
      )}
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
