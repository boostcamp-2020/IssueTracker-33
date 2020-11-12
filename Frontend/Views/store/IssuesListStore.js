import React from 'react';

const isQueryReducer = (isQuery, { type, data }) => {
  switch (type) {
    case 'switch':
      return data;
    default:
  }
};

const checkedIssuesReducer = (checkedIssues, { type, data, option }) => {
  switch (type) {
    case 'addAll':
      return data;
    case 'deleteAll':
      return [];
    case 'add':
      return [...checkedIssues, data];
    case 'filter':
      return checkedIssues.filter((elem) => elem !== option);
    default:
  }
};

const isCheckAllReducer = (isCheckAll, { type, data }) => {
  switch (type) {
    case 'set':
      return data;
    default:
  }
};

const allCheckedReducer = (allChecked, { type, data }) => {
  switch (type) {
    case 'set':
      return data;
    default:
  }
};

const isMarkAsReducer = (isMarkAs, { type, data }) => {
  switch (type) {
    case 'set':
      return data;
    default:
  }
};

const IsQueryContext = React.createContext();
const CheckedIssuesContext = React.createContext();
const IsCheckAllContext = React.createContext();
const AllCheckedContext = React.createContext();
const IsMarkAsContext = React.createContext();

export {
  isQueryReducer,
  checkedIssuesReducer,
  isCheckAllReducer,
  allCheckedReducer,
  isMarkAsReducer,
  IsQueryContext,
  CheckedIssuesContext,
  IsCheckAllContext,
  AllCheckedContext,
  IsMarkAsContext,
};
