import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IssuesPage from './IssuesPage';
import { randomRGB } from '../../style/randomNeonRGB';

const MainPageWrapper = styled.div`
  padding: 50px 300px 50px 300px;
  background-color: black;
  min-height: calc(100vh - 50px);
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5d300;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px;
`;

const NeonButton = styled.span`
  font-style: italic;
  font-size: 40px;
  font-weight: bolder;
  text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
`;

const IssueMainPage = () => {
  return (
    <MainPageWrapper>
      <NavBar>
        <div>
          <Link to="/labels" style={{ textDecoration: 'none' }}>
            <NeonButton>Labels </NeonButton>
          </Link>
          <Link to="/milestones" style={{ textDecoration: 'none' }}>
            <NeonButton> Milestones</NeonButton>
          </Link>
        </div>
        <Link to="/issues/new" style={{ textDecoration: 'none' }}>
          <NeonButton>New Issue </NeonButton>
        </Link>
      </NavBar>
      <IssuesPage />
    </MainPageWrapper>
  );
};

export default IssueMainPage;
