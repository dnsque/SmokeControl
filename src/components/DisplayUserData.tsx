import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SavingsProductSuggestions from './SavingsProductSuggestions';

const DisplayUserData = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reference the current user's document
        const userDocRef = doc(db, "userData", user.uid);
        // Set up a real-time listener on the document
        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            } else {
              console.log("Nėra duomenų šiam vartotojui");
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Klaida gaunant vartotojo duomenys:", error);
            setLoading(false);
          }
        );

        // Cleanup the onSnapshot listener when the component unmounts or user changes
        return () => unsubscribeSnapshot();
      } else {
        // If no user is logged in, stop loading
        setLoading(false);
      }
    });

    // Cleanup the auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center m-4">
        <div className="loading loading-spinner" role="status" aria-hidden="true"></div>
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
