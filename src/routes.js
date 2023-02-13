import User from './pages/User';
import AuthAdmin from './pages/AuthAdmin';
import AdminPanel from './pages/AdminPanel';

export const publicRoutes = [
    {
        path: '/',
        Component: User
    },
    {
        path: '/auth-admin',
        Component: AuthAdmin
    },
    {
        path: '/admin-panel',
        Component: AdminPanel
    }
]