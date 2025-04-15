import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface UserData {
  id: string;
  displayName?: string;
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

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        // Create a query to get users sorted by savings (highest first)
        const usersQuery = query(
          collection(db, "userData"),
          orderBy("savings", "desc"),
          limit(20) // Limit to top 20 users for performance
        );

        const querySnapshot = await getDocs(usersQuery);
        const userData: UserData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<UserData, 'id'>;
          userData.push({
            id: doc.id,
            ...data,
          });
        });

        setUsersData(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Nepavyko gauti vartotojų duomenų");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  // Calculate days since quit date
  const calculateDaysSinceQuit = (quitDateStr: string) => {
    const quitDate = new Date(quitDateStr);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - quitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

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
        <div className="overflow-x-auto">
          <table className="table w-full">
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
                  <td>
                    {user.displayName || "Anonimas"}
                  </td>
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