import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

const AUTH_SCREENS = ['/', '/login', '/register'] as const;

type DropdownItem = {
  label: string;
  to?: string;
  onClick?: () => void;
  isButton?: boolean;
};

const UserDropdown = ({ 
  onClose,
  onLogout
}: {
  onClose: () => void;
  onLogout: () => void;
}) => {
  const dropdownItems: DropdownItem[] = [
    { label: 'Profile', to: '/profile', onClick: onClose },
    { label: 'Settings', to: '/settings', onClick: onClose },
    { label: 'Sign Out', onClick: onLogout, isButton: true },
  ];

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      {dropdownItems.map((item) => (
        item.isButton ? (
          <button
            key={item.label}
            onClick={item.onClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </button>
        ) : (
          <Link 
            key={item.label}
            to={item.to!} 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={item.onClick}
          >
            {item.label}
          </Link>
        )
      ))}
    </div>
  );
};

const ProfileButton = ({ 
  onClick,
  isDropdownOpen
}: {
  onClick: () => void;
  isDropdownOpen: boolean;
}) => (
  <button 
    onClick={onClick}
    aria-expanded={isDropdownOpen}
    aria-label="User menu"
    className="flex items-center space-x-1 focus:outline-none"
  >
    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    </div>
  </button>
);

const MobileMenuButton = () => (
  <button className="md:hidden" aria-label="Mobile menu">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

export const Header = () => {
  const { user, dispatch } = useAuthContext();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthScreen = useMemo(
    () => AUTH_SCREENS.includes(location.pathname as typeof AUTH_SCREENS[number]),
    [location.pathname]
  );

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  }, [dispatch]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  return (
    <header className="!bg-primary-900 !text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center" />
            <h1 className="text-2xl font-bold">Smart Skills</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-primary-300 transition-colors">Help</Link>
            
            {!isAuthScreen && user && (
              <div className="relative" ref={dropdownRef}>
                <ProfileButton 
                  onClick={toggleDropdown} 
                  isDropdownOpen={isDropdownOpen} 
                />
                {isDropdownOpen && (
                  <UserDropdown 
                    onClose={closeDropdown} 
                    onLogout={handleLogout} 
                  />
                )}
              </div>
            )}
          </nav>
         <MobileMenuButton />
        </div>
      </div>
    </header>
  );
};