import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface UserData {
  id: string;
  displayName?: string;
  email?: string;
  savings: number;
  quitTime: string;
  frequency: number;
  price: number;
}

const TopUsersRanking: React.FC = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate days since quit date
  const calculateDaysSinceQuit = (quitDateStr: string) => {
    const quitDate = new Date(quitDateStr);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - quitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        // Create a query to get top 15 users sorted by savings
        const usersQuery = query(
          collection(db, "userData"),
          orderBy("savings", "desc"),
          limit(15)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  if (usersData.length === 0) {
    return <p className="text-center text-sm">Nerasta vartotojų duomenų</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Geriausi 15 vartotojų</h2>
      <div className="overflow-x-auto">
        <table className="table table-sm w-full">
          <thead>
            <tr>
              <th className="text-center">Vieta</th>
              <th>Vartotojas</th>
              <th className="text-center">Dienų</th>
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
                <td className="text-right font-semibold">
                  {user.savings.toFixed(2)}€
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <Link to="/ratings" className="btn btn-accent btn-sm">
          Pilnas reitingas
        </Link>
      </div>
    </div>
  );
};

export default TopUsersRanking; 