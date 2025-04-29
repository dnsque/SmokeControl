import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../firebase/auth';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef<HTMLDivElement>(null);


    const menuLinks = [
        { path: '/', label: 'Pagrindinis' },
        { path: '/articles', label: 'Straipsniai' },
        { path: '/ratings', label: 'Reitingas' },
        { path: '/account', label: 'Paskyra' },
    ];

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
          if (
            navRef.current &&
            !navRef.current.contains(event.target as Node) &&
            isMobileMenuOpen
          ) {
            setIsMobileMenuOpen(false);
          }
        };
    
        document.addEventListener('touchstart', handleClickOutside);
    
        return () => {
          document.removeEventListener('touchstart', handleClickOutside);
        };
      }, [isMobileMenuOpen]);
    

    const handleLogout = async () => {
        try {
            await logout((path: string) => {
                navigate(path);
            });
        } catch (error) {
            console.error('Atsijungimo klaida:', error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
        <div ref={navRef} className="m-4 rounded-[34px] overflow-hidden backdrop-blur-md bg-base-300/80 shadow-lg">
      
          <nav className={`w-full md:w-auto p-2 rounded-full shadow-gray-950
              ${isMobileMenuOpen ? 'rounded-b-none rounded-t-[34px]' : ''} bg-transparent`}>
            
            {/* Mobile Top Row */}
            <div className="flex md:hidden items-center justify-between p-1">
              <h1 className="text-lg font-bold">
                <Link to="/" onClick={handleLinkClick}>SmokeControl</Link>
              </h1>
              <button onClick={toggleMobileMenu} className="btn btn-ghost btn-circle bg-primary" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
      
            {/* Desktop Menu */}
            <ul className="hidden md:flex text-center items-center menu-horizontal space-x-4">
              {menuLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`rounded-4xl px-4 py-2 ${isActive(path) ? 'bg-base-300/70 text-white' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="btn btn-secondary rounded-4xl">Atsijungti</button>
                ) : (
                  <Link
                    to="/login"
                    className={`btn rounded-4xl ${isActive('/login') ? 'bg-black text-white' : 'btn-primary'}`}
                  >
                    Prisijungti
                  </Link>
                )}
              </li>
            </ul>
          </nav>
      
          {isMobileMenuOpen && (
            <ul className="md:hidden w-full p-2 pt-0">
              {menuLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className={`block w-full py-3 px-4 rounded-xl ${
                      isActive(path) ? 'bg-base-300/70 text-white font-bold' : ''
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-4 p-1">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="btn btn-secondary rounded-4xl w-full">Atsijungti</button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className={`btn w-full rounded-4xl ${isActive('/login') ? 'bg-base-300/70 text-white' : 'btn-primary'}`}
                  >
                    Prisijungti
                  </Link>
                )}
              </li>
            </ul>
          )}
      
        </div>
      </header>
      
    );
    
};

export default Header;
