import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../auth';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    return (
        <header className="fixed top-0 right-0 left-0 flex justify-center z-50">
            <nav className="rounded-full p-1 m-4 bg-base-300/70 backdrop-blur-md shadow-gray-950">
                <ul className="menu text-center content-center items-center menu-horizontal space-x-2">
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
            </nav>
        </header>
    );
};

export default Header;