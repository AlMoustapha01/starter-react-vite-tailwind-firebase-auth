import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashbordHeader';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
