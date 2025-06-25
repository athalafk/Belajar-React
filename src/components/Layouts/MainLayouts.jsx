import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import useAuth from '../../hooks/useAuth.js';
import { useSelector } from 'react-redux';
import Notification from '../Elements/Notification';

const MainLayout = () => {
    const isAuthenticated = useAuth();
    const { message, type } = useSelector((state) => state.notification);

    if (!isAuthenticated) {
        return null; 
    }
    
    return (
        <div>
            <Navbar />
            <Notification message={message} type={type} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;