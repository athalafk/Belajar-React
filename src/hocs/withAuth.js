import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const email = localStorage.getItem('email');
      
      if (!email) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    }, [navigate]);

    if (!isAuthenticated) {
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;