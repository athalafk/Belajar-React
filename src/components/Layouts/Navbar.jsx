import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const email = localStorage.getItem("email");
    const username = email ? email.split('@')[0] : '';

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        navigate("/login");
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
                                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;