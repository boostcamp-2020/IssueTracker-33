import React from 'react';

const issuesReducer = (issues, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const reloadReducer = (reload, { type }) => {
  switch (type) {
    case 'switch':
      return !reload;
    default:
  }
};

const IssuesContext = React.createContext();
const ReloadContext = React.createContext();

export { issuesReducer, reloadReducer, IssuesContext, ReloadContext };
