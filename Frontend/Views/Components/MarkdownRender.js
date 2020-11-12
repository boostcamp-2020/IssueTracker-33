import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const MarkdownWrapper = styled.div`
  display: block;
  padding: 15px;
  max-height: 530px;
`;

const MarkdownRender = ({ comment }) => {
  const renderers = {
    image: ({ alt, src, title }) => <img alt={alt} src={src} title={title} style={{ maxWidth: 300 }} />,
  };

  return (
    <MarkdownWrapper>
      <ReactMarkdown source={comment} renderers={renderers} escapeHtml={false} />
    </MarkdownWrapper>
  );
};

export default MarkdownRender;
