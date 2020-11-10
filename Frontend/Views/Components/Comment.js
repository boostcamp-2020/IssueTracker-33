import React from 'react';
import MarkdownRender from './MarkdownRender';

const Comment = ({ description, isOwner }) => {
  return (
    <>
      <MarkdownRender comment={description} />
    </>
  );
};

export default Comment;
