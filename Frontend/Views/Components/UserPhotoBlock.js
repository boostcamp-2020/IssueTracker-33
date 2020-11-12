import React from 'react';
import styled from 'styled-components';

const UserPhotoImg = styled.img`
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  height: 40px;
  width: 40px;
  border-radius: 3px;
`;

const UserPhotoBlock = ({ imageLink }) => {
  return <UserPhotoImg src={imageLink} alt="user" />;
};

export default UserPhotoBlock;
