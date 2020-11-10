import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRender = ({ comment }) => {
  const renderers = {
    image: ({ alt, src, title }) => <img alt={alt} src={src} title={title} style={{ maxWidth: 300 }} />,
  };

  return (
    <>
      <ReactMarkdown source={comment} renderers={renderers} escapeHtml={false} />
    </>
  );
};

export default MarkdownRender;
