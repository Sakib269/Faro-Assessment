import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;