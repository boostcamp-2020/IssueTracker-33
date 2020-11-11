import React from 'react';

const milestonesReducer = (milestones, { type, data }) => {
  switch (type) {
    case 'setInitial':
      return data;
    default:
  }
};

const labelsReducer = (labels, { type, data, target }) => {
  switch (type) {
    case 'setInitial':
      return data;

    case 'add':
      return [...labels, data];

    case 'targetUpdate':
      return labels?.map((label) => {
        if (label.id === target) {
          return Object.assign(label, data);
        }
        return label;
      });

    case 'delete':
      return labels.filter((label) => label.id !== target);

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
