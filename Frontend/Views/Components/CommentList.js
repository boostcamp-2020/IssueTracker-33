import React from 'react';
import Comment from './Comment';

const CommentList = ({ commentsData, owner }) => {
  return (
    <>
      {commentsData.map((comment) => (
        <Comment key={comment.id} description={comment.description} isOwner={owner === comment.userId} />
      ))}
    </>
  );
};

export default CommentList;
