import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useClickOutside from '../Modal';
import { ReloadContext } from '../../store/IssuesPageStore';
import { CheckedIssuesContext, AllCheckedContext, IsMarkAsContext } from '../../store/IssuesListStore';
import { CustomButton, randomRGB } from '../../../style/Neon';

const Wrapper = styled.div`
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #ff00de, 0 0 7px #ff00de, 0 0 8px #ff00de, 0 0 10px #ffffff, 0 0 15px #ffffff;
  position: absolute;
  background-color: ${randomRGB()};
  border: 4px solid white;
  color: black;
  border-radius: 5px;
  width: 200px;
  padding: 7px;
  top: 50px;
  right: 0px;
  z-index: 1;
  & :hover {
    color: white;
  }
`;

const MarkAs = () => {
  const { reloadDispatch } = useContext(ReloadContext);
  const { checkedIssues, checkedIssuesDispatch } = useContext(CheckedIssuesContext);
  const { allCheckedDispatch } = useContext(AllCheckedContext);
  const { isMarkAsDispatch } = useContext(IsMarkAsContext);

  const [isVisible, setIsVisible] = useState(false);

  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const MarkAsList = () => {
    const onChangeStatus = async (status) => {
      const URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues/status`;
      const config = { withCredentials: true };
      const postData = {
        issues: checkedIssues,
        isOpen: status,
      };
      try {
        await axios.patch(URL, postData, config);
        onToggleDropdown();
        isMarkAsDispatch({ type: 'set', data: false });
        allCheckedDispatch({ type: 'set', data: false });
        checkedIssuesDispatch({ type: 'deleteAll' });
        reloadDispatch({ type: 'switch' });
      } catch (err) {
        console.log('error');
      }
    };

    return (
      <Wrapper>
        <div>Actions</div>
        <div onClick={() => onChangeStatus(1)}>Open</div>
        <div onClick={() => onChangeStatus(0)}>Closed</div>
      </Wrapper>
    );
  };

  return (
    <>
      <div ref={domNode}>
        <CustomButton onClick={onToggleDropdown} style={{ position: 'relative' }}>
          Mark as
          {isVisible && <MarkAsList />}
        </CustomButton>
      </div>
    </>
  );
};

export default MarkAs;
