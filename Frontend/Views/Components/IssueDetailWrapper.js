import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueDetailTitle from './IssueDetailTitle';
import NewIssueOption from './NewIssueOption';
import CommentList from './CommentList';

const IssueDetailWrapper = () => {
  const [userSelectedData, setUserSelectedData] = useState([]);
  const [labelSelectedData, setLabelSelectedData] = useState([]);
  const [mileSelectedData, setMileSelectedData] = useState([]);
  const [issueData, setIssueData] = useState({});
  const [commentsData, setCommentsData] = useState([]);

  const getIssue = async () => {
    try {
      return await axios.get('http://localhost:3000/api/v1/issues/22');
    } catch (err) {
      console.err(err);
    }
  };

  const getComments = async () => {
    try {
      return await axios.get('http://localhost:3000/api/v1/issues/22/comments');
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
      <CommentList commentsData={commentsData} />
      <NewIssueOption
        userSelectedData={userSelectedData}
        labelSelectedData={labelSelectedData}
        mileSelectedData={mileSelectedData}
        setUserSelectedData={setUserSelectedData}
        setLabelSelectedData={setLabelSelectedData}
        setMileSelectedData={setMileSelectedData}
      />
    </>
  );
};

export default IssueDetailWrapper;
