import React from 'react';
import ErrorBoundary from './error/ErrorBoundary';
import UserRoutes from './Router/UserRoute';

const App = () => {
  return (
    <ErrorBoundary>
      <UserRoutes />
      </ErrorBoundary>
  );
};

export default App;
