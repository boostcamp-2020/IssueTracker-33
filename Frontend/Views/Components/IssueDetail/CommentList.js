import React from 'react';
import CommentWrapper from './CommentWrapper';

const CommentList = ({ commentsData, owner }) => {
  const getUserId = (cookie) => {
    const token = cookie.split('=')[1].split('.');
    const { userId } = JSON.parse(window.atob(token[1].replace('_', '/').replace('-', '+')));
    return userId;
  };

  return (
    <>
      {commentsData.map((comment) => (
        <CommentWrapper
          key={comment.id}
          comment={comment}
          isOwner={owner === comment.userId}
          isWriter={getUserId(document.cookie) === comment.userId}
        />
      ))}
    </>
  );
};

export default CommentList;
