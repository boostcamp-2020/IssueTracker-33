import React, { useContext, useEffect, useState } from 'react';
import CommentWrapper from './CommentWrapper';
import { UsersContext } from '../../store/AppStore';

const CommentList = ({ commentsData, owner }) => {
  const { users } = useContext(UsersContext);

  const [mappedUsers, setMappedUsers] = useState();

  const getUserId = (cookie) => {
    const token = cookie.split('=')[1].split('.');
    const { userId } = JSON.parse(window.atob(token[1].replace('_', '/').replace('-', '+')));
    return userId;
  };

  const toKeyValueMap = (records) => {
    if (!records) return;
    const map = {};
    records.forEach((record) => {
      map[record.id] = record;
    });
    return map;
  };

  useEffect(() => {
    setMappedUsers(toKeyValueMap(users));
  }, [users]);

  return (
    <>
      {commentsData.map((comment) => (
        <CommentWrapper
          key={comment.id}
          comment={comment}
          isOwner={owner === comment.userId}
          isWriter={getUserId(document.cookie) === comment.userId}
          writerName={mappedUsers[comment.userId].username}
          writerImage={mappedUsers[comment.userId].imageLink}
        />
      ))}
    </>
  );
};

export default CommentList;
