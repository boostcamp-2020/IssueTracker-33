import React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../MarkdownRender';

const CommentDiv = styled.div`
  overflow: auto;
`;

const Comment = ({ description }) => {
  return (
    <CommentDiv>
      <MarkdownRender comment={description} />
    </CommentDiv>
  );
};

export default Comment;
