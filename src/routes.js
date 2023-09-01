import UserPage from './pages/UserPage'
import AuthAdmin from './pages/AuthAdmin'
import AdminPanel from './pages/AdminPanel'

export const publicRoutes = [
    {
        path: '/',
        Component: UserPage,
    },
    {
        path: '/auth-admin',
        Component: AuthAdmin,
    },
    {
        path: '/admin-panel',
        Component: AdminPanel,
    },
]
