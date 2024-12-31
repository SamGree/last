import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/auth-store';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
