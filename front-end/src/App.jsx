import React from 'react';
import ErrorBoundary from './error/ErrorBoundary';
import RootRoutes from './Router/RootRouterSMP';
const App = () => {
  return (
    <ErrorBoundary>
      <RootRoutes/>
      {/* <ProfilAdmin/> */}
      </ErrorBoundary>
  );
};

export default App;
