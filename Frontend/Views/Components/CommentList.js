import React from 'react';
import Comment from './Comment';

const CommentList = ({ commentsData }) => {
  return (
    <>
      {commentsData.map((comment) => (
        <Comment key={comment.id} description={comment.description} />
      ))}
    </>
  );
};

export default CommentList;
