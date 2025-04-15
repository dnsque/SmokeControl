import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../firebase/auth';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Function to check if a path is active
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

    const handleLogout = async () => {
        await logout((path: string) => {
            navigate(path);
        });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="fixed top-0 right-0 left-0 flex justify-center z-50">
            <nav className="rounded-full p-1 m-4 bg-base-300/70 backdrop-blur-md shadow-gray-950">
                <div className="flex md:hidden items-center justify-between">
                    <Link to="/" className="text-lg font-bold">SmokeControl</Link>
                    <button onClick={toggleMobileMenu} className="btn btn-ghost btn-circle" aria-label="Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                <ul className={`menu text-center content-center items-center menu-horizontal space-x-2 ${isMobileMenuOpen ? 'hidden' : ''}`}>
                    {isLoggedIn ? (
                        <li><button onClick={handleLogout} className="btn rounded-4xl btn-secondary">Atsijungti</button></li>
                    ) : (
                        <li><Link to="/login" className={`btn rounded-4xl ${isActive('/login') ? 'bg-black text-white' : 'btn-primary'}`}>Prisijungti</Link></li>
                    )}
                    <li><Link to="/" className={`rounded-4xl ${isActive('/') ? 'bg-black text-white font-bold' : ''}`}>Pagrindinis</Link></li>
                    <li><Link to="/articles" className={`rounded-4xl ${isActive('/articles') ? 'bg-black text-white font-bold' : ''}`}>Straipsniai</Link></li>
                    <li><Link to="/ratings" className={`rounded-4xl ${isActive('/ratings') ? 'bg-black text-white font-bold' : ''}`}>Reitingas</Link></li>
                    <li><Link to="/account" className={`rounded-4xl ${isActive('/account') ? 'bg-black text-white font-bold' : ''}`}>Paskyra</Link></li>
                </ul>

                {isMobileMenuOpen && (
                    <div className="md:hidden fixed top-[64px] left-0 right-0 bg-base-300/70 backdrop-blur-md shadow-lg z-50 rounded-b-lg">
                        <ul className="menu menu-vertical p-4 w-full">
                            <li><Link to="/" className={`w-full py-3 ${isActive('/') ? 'bg-black text-white font-bold' : ''}`}>Pagrindinis</Link></li>
                            <li><Link to="/articles" className={`w-full py-3 ${isActive('/articles') ? 'bg-black text-white font-bold' : ''}`}>Straipsniai</Link></li>
                            <li><Link to="/ratings" className={`w-full py-3 ${isActive('/ratings') ? 'bg-black text-white font-bold' : ''}`}>Reitingas</Link></li>
                            <li><Link to="/account" className={`w-full py-3 ${isActive('/account') ? 'bg-black text-white font-bold' : ''}`}>Paskyra</Link></li>
                            <li className="mt-4">
                                {isLoggedIn ? (
                                    <button onClick={handleLogout} className="btn btn-secondary w-full">Atsijungti</button>
                                ) : (
                                    <Link to="/login" className={`btn w-full ${isActive('/login') ? 'bg-black text-white' : 'btn-primary'}`}>Prisijungti</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header; 