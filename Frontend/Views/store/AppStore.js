import React from 'react';

const milestonesReducer = (milestones, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const labelsReducer = (labels, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const usersReducer = (users, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const MilestonesContext = React.createContext();
const LabelsContext = React.createContext();
const UsersContext = React.createContext();
export { milestonesReducer, labelsReducer, usersReducer, MilestonesContext, LabelsContext, UsersContext };
