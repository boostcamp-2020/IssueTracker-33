import React from 'react';
import NewIssuePage from './Pages/NewIssuePage';
import IssuesPage from './Pages/IssuesPage';

const App = () => {
  return (
    <>
      {/* TODO: add URL router */}
      <IssuesPage />
      <NewIssuePage />
    </>
  );
};

export default App;
