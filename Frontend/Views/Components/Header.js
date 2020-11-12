import React from 'react';
import { useHistory } from 'react-router-dom';
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

  p:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const history = useHistory();

  const onClickHeader = () => {
    history.push('/issues');
  };
  return (
    <HeaderWrapper>
      <ClassOutlinedIcon color="white" />
      <p onClick={onClickHeader}>ISSUES</p>
    </HeaderWrapper>
  );
};

export default Header;
