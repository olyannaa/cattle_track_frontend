import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuth = !!localStorage.getItem('user');
    if (!isAuth) {
        return <Navigate to='/' />;
    }
    return (
        <>
            <Outlet />
        </>
    );
};
