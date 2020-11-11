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
  const [commentsData, setCommentsData] = useState([]);

  const getIssue = async () => {
    try {
      return await axios.get(`${process.env.API_URL}/${process.env.API_VERSION}/issues/${issueId}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.err(err.message);
    }
  };

  const getComments = async () => {
    try {
      return await axios.get(`${process.env.API_URL}/${process.env.API_VERSION}/issues/${issueId}/comments`, {
        withCredentials: true,
      });
    } catch (err) {
      console.err(err.message);
    }
  };

  const readIssue = async () => {
    const result = await getIssue();
    setUserSelectedData([...result.data.assignees]);
    setLabelSelectedData([...result.data.labels]);
    if (result.data.issue.milestoneId !== null) {
      setMileSelectedData([result.data.issue.milestoneId]);
    }
    setIssueData(result.data.issue);
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
      console.log(err);
    }
  }, []);

  return (
    <>
      <IssueDetailTitle issueData={issueData} />
      <CommentList commentsData={commentsData} owner={issueData.userId} />
      <NewIssueOption
        userSelectedData={userSelectedData}
        labelSelectedData={labelSelectedData}
        mileSelectedData={mileSelectedData}
        setUserSelectedData={setUserSelectedData}
        setLabelSelectedData={setLabelSelectedData}
        setMileSelectedData={setMileSelectedData}
      />
      <CommentForm issueId={issueId} commentsData={commentsData} setCommentsData={setCommentsData} />
    </>
  );
};

export default IssueDetailWrapper;
