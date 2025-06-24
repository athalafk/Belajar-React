import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import useAuth from '../../hooks/useAuth.js';

const MainLayout = () => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return null; 
    }
    
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;