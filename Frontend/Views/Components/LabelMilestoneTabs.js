import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AssistantPhotoOutlinedIcon from '@material-ui/icons/AssistantPhotoOutlined';

const Wrapper = styled.div`
  width: 250px;
  border: 1px solid var(--border-gray);
  border-radius: 5px;
  background-color: white;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 30px;
  button {
    border-right: 1px solid var(--border-gray);
  }
  &:last-child {
    border-right: none;
  }
`;

const Button = styled.button`
  width: ${(props) => props.width || '50%'};
  height: 32px;
  border-left: none;
  border-top: none;
  border-bottom: none;
  background-color: white;
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
`;

const LabelMilestoneTabs = () => {
  return (
    <>
      <Wrapper>
        <Link to="/labels">
          <Button type="button" width="45%">
            <div>
              <LocalOfferOutlinedIcon style={{ fontSize: 20 }} />
              <span>Labels</span>
            </div>
          </Button>
        </Link>
        <Link to="/milestones">
          <Button type="button" width="55%">
            <div>
              <AssistantPhotoOutlinedIcon style={{ fontSize: 20 }} />
              <span>Milestones</span>
            </div>
          </Button>
        </Link>
      </Wrapper>
    </>
  );
};

export default LabelMilestoneTabs;
