import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/index';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SavingsProductSuggestions from './SavingsProductSuggestions';

const DisplayUserData = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("DisplayUserData: Компонент инициализирован");
    
    // Listen for authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("DisplayUserData: Статус аутентификации изменился:", user ? `пользователь ${user.uid}` : "не авторизован");
      
      if (user) {
        // Reference the current user's document
        const userDocRef = doc(db, "userData", user.uid);
        console.log("DisplayUserData: Создана ссылка на документ:", user.uid);
        
        // Set up a real-time listener on the document
        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (docSnap) => {
            console.log("DisplayUserData: Получен снэпшот, данные существуют:", docSnap.exists());
            
            if (docSnap.exists()) {
              const data = docSnap.data();
              console.log("DisplayUserData: Данные документа:", data);
              setUserData(data);
            } else {
              console.log("Нет данных для этого пользователя");
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("DisplayUserData: Ошибка при получении данных:", error);
            setError(`Ошибка при получении данных: ${error.message}`);
            setLoading(false);
          }
        );

        // Cleanup the onSnapshot listener when the component unmounts or user changes
        return () => {
          console.log("DisplayUserData: Отписка от слушателя документа");
          unsubscribeSnapshot();
        };
      } else {
        // If no user is logged in, stop loading
        console.log("DisplayUserData: Нет авторизованного пользователя, останавливаем загрузку");
        setLoading(false);
      }
    });

    // Cleanup the auth listener on unmount
    return () => {
      console.log("DisplayUserData: Отписка от слушателя аутентификации");
      unsubscribeAuth();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center m-4">
        <div className="loading loading-spinner" role="status" aria-hidden="true"></div>
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

  if (!userData) {
    return <p className="text-center">Nėra duomenų</p>;
  }

  const savings = userData.savings ? parseFloat(userData.savings) : 0;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="card m-2 bg-base-300 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Sveiki, {userData.displayName || "Anonimai"}!</h2>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-right font-semibold">Pakuotės kaina:</p>
            <p>{userData.price}€</p>
            
            <p className="text-right font-semibold">Metimo data:</p>
            <p>{userData.quitTime}</p>
            
            <p className="text-right font-semibold">Cigarečių per dieną:</p>
            <p>{userData.frequency}</p>
            
            <p className="text-right font-semibold">Sutaupyta:</p>
            <p className="font-bold text-success">{savings.toFixed(2)}€</p>
          </div>
        </div>
      </div>
      
      {/* Show product suggestions based on savings */}
      <div className="w-full max-w-4xl mt-6">
        <SavingsProductSuggestions savings={savings} />
      </div>
    </div>
  );
};

export default DisplayUserData;
