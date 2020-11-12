import React from 'react';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: var(--header-black);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  p {
    height: 100%;
    padding-top: 16px;
    line-height: 20px;
    margin: 0;
    text-align: center;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <ClassOutlinedIcon color="white" />
      <p>ISSUES</p>
    </HeaderWrapper>
  );
};

export default Header;
