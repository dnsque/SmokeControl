import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DisplayUserData from '../components/DisplayUserData';
import UserDataForm from '../forms/UserDataForm';
import { auth } from '../firebase';
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
                    <title>SmokeControl - Prisijungimas reikalingas</title>
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
        <div>
            <Helmet>
                <title>SmokeControl - Jūsų paskyra</title>
                <meta name="description" content="Jūsų asmeniniai duomenys ir statistika" />
            </Helmet>
            <h1 className='text-2xl font-bold'>Jūsų duomenys:</h1>
            <DisplayUserData />
            <div className='flex justify-center items-center m-2'> 
                <label htmlFor="my-modal" className="btn">Redaguoti duomenys</label>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                
                <div className="modal">
                    <div className="modal-box w-96">
                    <div className="modal-action mt-0">
                            <label htmlFor="my-modal" className="btn btn-square"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></label>
                        </div>
                        <UserDataForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage; 