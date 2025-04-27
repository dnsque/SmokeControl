import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../firebase/index';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

interface UserData {
  id: string;
  username: string;
  email?: string;
  savings: number;
  quitTime: string;
  frequency: number;
  price: number;
}

const UserRatingsPage: React.FC = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const fetchUsersData = async () => {
      try {
        const usersQuery = query(
          collection(db, "userData"),
          orderBy("savings", "desc"),
          limit(100)
        );

        const querySnapshot = await getDocs(usersQuery);
        const userData: UserData[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<UserData, 'id'>,
        }));

        setUsersData(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Nepavyko gauti vartotojų duomenų");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();

    return () => unsubscribeAuth();
  }, []);

  // Мемоизация для вычисления дней с момента отказа
  const calculateDaysSinceQuit = useMemo(() => (quitDateStr: string) => {
    const quitDate = new Date(quitDateStr);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - quitDate.getTime();
    return Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Helmet>
          <title>SmokeControl - Vartotojų reitingas</title>
        </Helmet>
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Helmet>
          <title>SmokeControl - Klaida</title>
        </Helmet>
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>SmokeControl - Vartotojų reitingas</title>
        <meta name="description" content="Vartotojų reitingas ir sutaupytų pinigų statistika" />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-8">Vartotojų reitingas ir sutaupymai</h1>

      {usersData.length === 0 ? (
        <p className="text-center text-lg">Nerasta vartotojų duomenų</p>
      ) : (
        <div className="relative">
          <div className="overflow-x-auto">
            <table className={`table w-full ${!isLoggedIn ? 'blur-sm' : ''}`}>
              <thead>
                <tr>
                  <th className="text-center">Vieta</th>
                  <th>Vartotojas</th>
                  <th className="text-center">Dienų be rūkymo</th>
                  <th className="text-center">Nerūkyta cigarečių</th>
                  <th className="text-right">Sutaupyta</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr key={user.id} className={index < 3 ? "bg-base-200" : ""}>
                    <td className="text-center font-bold">
                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                      {index > 2 && (index + 1)}
                    </td>
                    <td>{user.username || "Anonimas"}</td>
                    <td className="text-center">
                      {calculateDaysSinceQuit(user.quitTime)}
                    </td>
                    <td className="text-center">
                      {calculateDaysSinceQuit(user.quitTime) * user.frequency}
                    </td>
                    <td className="text-right font-semibold">
                      {user.savings.toFixed(2)}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isLoggedIn && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="bg-base-300 p-6 rounded-lg shadow-lg max-w-md text-center">
                <h3 className="text-xl font-bold mb-4">Norėdami peržiūrėti reitingą, prašome prisijungti</h3>
                <p className="mb-6">Prisijungę galėsite matyti vartotojų reitingą be apribojimų.</p>
                <Link to="/login" className="btn btn-primary">Prisijungti</Link>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Kaip skaičiuojame sutaupymus?</h2>
        <p>
          Sutaupymai skaičiuojami pagal jūsų nurodytą cigarečių kainą, rūkymo dažnį ir laiką, kiek nerūkote.
          Kuo ilgiau nerūkote, tuo daugiau sutaupote!
        </p>
      </div>
    </div>
  );
};

export default UserRatingsPage;
