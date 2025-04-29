import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import TopUsersRanking from '../components/TopUsersRanking';
import HomeArticles from '../components/HomeArticles';
import cigarette from '../assets/cigarette.png'
const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        
        return () => unsubscribe();
    }, []);

    return (
        <div className="container mx-auto p-4 text-center min-h-screen">
            <main className="flex flex-col items-center">
                <section className="mb-12 items-center">
                <section className="mb-8 max-w-2xl justify-center">
                    <HomeArticles />
                </section>
                    <h1 className="text-4xl font-bold mb-6">SmokeControl</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Programa, padedanti kontroliuoti ir motyvuoti mesti rūkyti</p>
                    <img className="w-full max-w-2xl mx-auto mb-8 rounded-lg" src={cigarette} alt="Logo" />
                {!isLoggedIn && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/login" className="btn btn-outline btn-lg">
                    Prisijungti
                    </Link>
                    <Link to="/register" className="btn btn-secondary btn-lg">
                    Registruotis
                    </Link>
                </div>
                )}

                </section>
                
                <section className="mb-8 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Mūsų programa padės jums:</h2>
                    <ul className="text-left list-disc list-inside space-y-2">
                        <li>Sekti savo pažangą kovojant su rūkymu</li>
                        <li>Sužinoti, kiek pinigų sutaupėte</li>
                        <li>Gauti motyvuojančių patarimų ir straipsnių</li>
                        <li>Palyginti savo rezultatus su kitais vartotojais</li>
                    </ul>
                </section>

                <section className="mb-8 w-full max-w-2xl">
                    <TopUsersRanking />
                </section>
            </main>
        </div>
    );
};

export default HomePage;