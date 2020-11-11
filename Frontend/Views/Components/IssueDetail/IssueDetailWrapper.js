import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueDetailTitle from './IssueDetailTitle';
import NewIssueOption from '../NewIssueOption';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const IssueDetailWrapper = ({ issueId }) => {
  const [userSelectedData, setUserSelectedData] = useState([]);
  const [labelSelectedData, setLabelSelectedData] = useState([]);
  const [mileSelectedData, setMileSelectedData] = useState([]);
  const [issueData, setIssueData] = useState({});
  const [isOpen, setIsOpen] = useState();
  const [commentsData, setCommentsData] = useState([]);

  const getIssue = async () => {
    try {
      return await axios.get(`${process.env.API_URL}/${process.env.API_VERSION}/issues/${issueId}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.err(err);
    }
  };

  const getComments = async () => {
    try {
      return await axios.get(`${process.env.API_URL}/${process.env.API_VERSION}/issues/${issueId}/comments`, {
        withCredentials: true,
      });
    } catch (err) {
      console.err(err);
    }
  };

  const readIssue = async () => {
    const result = await getIssue();
    setUserSelectedData([...result.data.assignees]);
    setLabelSelectedData([...result.data.labels]);
    setMileSelectedData([result.data.issue.milestoneId]);
    setIssueData(result.data.issue);
    setIsOpen(result.data.issue.isOpen);
  };

  const readComments = async () => {
    const result = await getComments();
    setCommentsData([...result.data.comments]);
  };

  useEffect(async () => {
    try {
      await readIssue();
      await readComments();
    } catch (err) {
      console.err(err);
    }
  }, []);

  return (
    <>
      <IssueDetailTitle issueData={issueData} isOpen={isOpen} />
      <CommentList commentsData={commentsData} owner={issueData.userId} />
      <NewIssueOption
        userSelectedData={userSelectedData}
        labelSelectedData={labelSelectedData}
        mileSelectedData={mileSelectedData}
        setUserSelectedData={setUserSelectedData}
        setLabelSelectedData={setLabelSelectedData}
        setMileSelectedData={setMileSelectedData}
      />
      <CommentForm
        issueId={issueId}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default IssueDetailWrapper;
