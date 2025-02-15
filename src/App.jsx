import React from 'react';
import ErrorBoundary from './error/ErrorBoundary';
import AdminRoutes from './Router/admin/AdminRouter';
import Data from './pages/admin/trafic/traficData';
import UserRoutes from './Router/user/UserRoute';
const App = () => {
  return (
    <ErrorBoundary>
      <UserRoutes/>
      <AdminRoutes/>
      </ErrorBoundary>
  );
};

export default App;
