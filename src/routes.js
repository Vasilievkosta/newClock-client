import User from './pages/User';
import Admin from './pages/Admin';
import Master from './pages/Master';
import BlockMaster from './components/BlockMaster';
import BlockCity from './components/BlockCity';

export const publicRoutes = [
    {
        path: '/',
        Component: User
    },
    {
        path: '/login',
        Component: Admin
    },
    {
        path: '/master',
        Component: Master
    },
    {
        path: '/master-content',
        Component: BlockMaster
    },
    {
        path: '/city-content',
        Component: BlockCity
    }	
]