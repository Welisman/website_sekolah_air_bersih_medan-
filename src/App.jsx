import React from 'react';
import ErrorBoundary from './error/ErrorBoundary';
import AdminRoutes from './Router/admin/AdminRouter';
import Data from './pages/admin/trafic/traficData';
import UserRoutes from './Router/user/UserRoute';
import RootRoutes from './Router/RootRouter';
import AdminDashboard from './pages/admin/dashboard/AdminDahsboard';
import UserAdmin from './pages/admin/UserAdmin';
const App = () => {
  return (
    <ErrorBoundary>
      <RootRoutes/>
      </ErrorBoundary>
  );
};

export default App;
