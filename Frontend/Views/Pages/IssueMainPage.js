import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IssuesPage from './IssuesPage';
import { randomRGB } from '../../style/Neon';

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
`;

const NeonButton = styled.span`
  font-style: italic;
  font-size: 40px;
  font-weight: bolder;
  text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
  margin: 10px;
  & :hover {
    text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #ff00de, 0 0 7px #ff00de, 0 0 8px #ff00de, 0 0 10px #ff00de, 0 0 15px #ff00de;
    color: white;
  }
`;

const IssueMainPage = () => {
  return (
    <MainPageWrapper>
      <NavBar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NeonButton>
            <Link to="/labels" style={{ textDecoration: 'none' }}>
              Labels
            </Link>
          </NeonButton>

          <NeonButton>
            <Link to="/milestones" style={{ textDecoration: 'none' }}>
              Milestones
            </Link>
          </NeonButton>
        </div>

        <NeonButton>
          <Link to="/issues/new" style={{ textDecoration: 'none' }}>
            New Issue
          </Link>
        </NeonButton>
      </NavBar>
      <IssuesPage />
    </MainPageWrapper>
  );
};

export default IssueMainPage;
