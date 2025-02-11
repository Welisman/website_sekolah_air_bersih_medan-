import React from 'react';
import Dashboard from './pages/home/Dashboard';
import ErrorBoundary from './error/ErrorBoundary';
import BerandaPage from './pages/home/BerandaPage';

const App = () => {
  return (
    <ErrorBoundary>
      <BerandaPage />
      </ErrorBoundary>
  );
};

export default App;
