import React from 'react';
import CommentWrapper from './CommentWrapper';

const CommentList = ({ commentsData, owner }) => {
  return (
    <>
      {commentsData.map((comment) => (
        <CommentWrapper key={comment.id} comment={comment} isOwner={owner === comment.userId} />
      ))}
    </>
  );
};

export default CommentList;
