import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CheckedIssuesContext, IsCheckAllContext, AllCheckedContext, IsMarkAsContext } from '../../store/IssuesListStore';
import { randomRGB } from '../../../style/randomNeonRGB';

const TitleBox = styled.div`
  width: 100%;
  display: flex;
`;

const LabelStyle = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  padding: 2px;
  font-size: 15px;
`;

const IssueHeader = styled.div`
  position: relative;
  align-items: center;
  font-size: 18px;
  display: flex;
  background-color: pink;
  padding: 5px;
  border-top-left-radius: 5px;
  z-index: 0;
  border-top-right-radius: 5px;
  &:hover {
    background-color: ${randomRGB()};
    color: white;
  }
`;

const IssueWrapper = styled.div`
  margin-top: 10px;
  padding: 5px;
  background-color: ${randomRGB()};
  border-radius: 10px;
`;

const IssueBody = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  display: flex;
  justify-content: space-between;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const UserImg = styled.img`
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid grey;
`;

const DescriptionDiv = styled.div`
  flex: 2;
`;

const AssingeeDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const IssueListItem = ({ issueMetaData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { checkedIssuesDispatch } = useContext(CheckedIssuesContext);
  const { isCheckAll } = useContext(IsCheckAllContext);
  const { allChecked, allCheckedDispatch } = useContext(AllCheckedContext);
  const { isMarkAs } = useContext(IsMarkAsContext);
  const { issue, author, labels, assignees, milestone } = issueMetaData;

  const history = useHistory();

  useEffect(() => {
    setIsChecked(isCheckAll);
  }, [isCheckAll]);

  useEffect(() => {
    if (allChecked) {
      setIsChecked(allChecked);
    }
  }, [allChecked]);

  useEffect(() => {
    if (!isMarkAs) {
      setIsChecked(false);
    }
  }, [isMarkAs]);

  const onCheckIssue = () => {
    if (isChecked === false) {
      setIsChecked(true);
      checkedIssuesDispatch({ type: 'add', data: issue.id });
    } else {
      setIsChecked(false);
      checkedIssuesDispatch({ type: 'filter', option: issue.id });
      allCheckedDispatch({ type: 'set', data: false });
    }
  };

  const onClickTitle = (id) => {
    history.push(`/issues/${id}`);
  };

  return (
    <IssueWrapper>
      <IssueHeader>
        <input key={issue.id} checked={isChecked} type="checkbox" onChange={onCheckIssue} />
        <TitleBox onClick={() => onClickTitle(issue.id)}>
          {issue.title}
          {labels.map((label) => (
            <LabelStyle key={label.id} color={label.color}>
              {label.name}
            </LabelStyle>
          ))}
        </TitleBox>
      </IssueHeader>
      <IssueBody>
        <DescriptionDiv>
          <span>{`#${issue.id} `}</span>
          <span>{issue.isOpen ? 'opened ' : 'closed '}</span>
          <span>{`${issue.createdAt} by `}</span>
          <span>{author.username}</span>
          <span>{milestone && '🍗' + milestone.title}</span>
        </DescriptionDiv>
        <AssingeeDiv>
          {assignees.map((assignee) => (
            <UserImg key={assignee.id} src={assignee.imageLink} alt="" />
          ))}
        </AssingeeDiv>
      </IssueBody>
    </IssueWrapper>
  );
};

export default IssueListItem;
