import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueDetailTitle from './IssueDetailTitle';
import NewIssueOption from './NewIssueOption';
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
      return await axios.get(`http://localhost:3000/api/v1/issues/${issueId}`, { withCredentials: true });
    } catch (err) {
      console.err(err);
    }
  };

  const getComments = async () => {
    try {
      return await axios.get(`http://localhost:3000/api/v1/issues/${issueId}/comments`, { withCredentials: true });
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
