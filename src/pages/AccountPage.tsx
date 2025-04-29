import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DisplayUserData from '../components/DisplayUserData';
import { auth } from '../firebase/index';
import { onAuthStateChanged } from 'firebase/auth';

const AccountPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        
        return () => unsubscribe();
    }, []);

    // Loading state
    if (isLoggedIn === null) {
        return (
            <div className="flex justify-center items-center h-64">
                <Helmet>
                    <title>SmokeControl - Paskyra</title>
                </Helmet>
                <div className="loading loading-spinner text-primary"></div>
            </div>
        );
    }

    // User not logged in
    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
                <Helmet>
                    <title>SmokeControl - Reikalingas prisijungimas</title>
                </Helmet>
                <h1 className="text-3xl font-bold text-center">Kad matytumėte savo duomenis, prisijunkite</h1>
                <Link to="/login" className="btn btn-primary btn-lg">
                    Prisijungti
                </Link>
            </div>
        );
    }

    // User is logged in - show account page
    return (
        <div className='min-h-screen p-4'>
            <Helmet>
                <title>SmokeControl - Jūsų paskyra</title>
                <meta name="description" content="Jūsų asmeniniai duomenys ir statistika" />
            </Helmet>
            <div><h1 className='text-2xl font-bold'>Jūsų duomenys:</h1>
                </div>
            <DisplayUserData />

            
        </div>
    );
};

export default AccountPage; 