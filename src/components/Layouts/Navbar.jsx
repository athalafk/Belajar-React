import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRightFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../../api/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
          localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
            localStorage.removeItem("username");
            navigate("/login");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="flex justify-between h-20 bg-blue-600 text-white items-center px-10">
            <h1 className="text-2xl font-bold">TokoSaya</h1>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg"
                >
                    <span className="capitalize">{username}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1 text-gray-700">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={logoutMutation.isLoading}
                            >
                                <FontAwesomeIcon 
                                    icon={logoutMutation.isLoading ? faSpinner : faRightFromBracket} 
                                    className={`w-5 h-5 ${logoutMutation.isLoading ? 'animate-spin' : ''}`}
                                />
                                {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;