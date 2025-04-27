import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/index';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SavingsProductSuggestions from './SavingsProductSuggestions';
import UserDataForm from '../forms/UserDataForm';

const DisplayUserData = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "userData", user.uid);
        
        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData(data);
            } else {
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            setError(`Klaida gaunant duomenis: ${error.message}`);
            setLoading(false);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      } else {
        setLoading(false);
      }
    });

    return () => {
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
    return (
      <div className='justify-center items-center m-2 col'>
        <div className='m-2'><p className="text-center">Nėra duomenų</p></div>
        <div><label htmlFor="my-modal" className="btn">Redaguoti duomenys</label></div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        
        <div className="modal">
          <div className="modal-box w-96">
            <div className="modal-action mt-0">
              <label htmlFor="my-modal" className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>
            </div>
            <UserDataForm />
          </div>
        </div>
      </div>
    );
  }

  const savings = userData.savings ? parseFloat(userData.savings) : 0;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="card m-2 bg-base-300 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Sveiki, {userData.username || "Anonimai"}!</h2>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-right font-semibold">Pakuotės kaina:</p>
            <p>{userData.price}€</p>
            
            <p className="text-right font-semibold">Metimo data:</p>
            <p>{userData.quitTime}</p>
            
            <p className="text-right font-semibold">Cigarečių per dieną:</p>
            <p>{userData.frequency}</p>
            
            <p className="text-right font-semibold">Raktiniai žodžiai:</p>
            <p>{userData.keywords?.join(', ')}</p>
            
            <p className="text-right font-semibold">Sutaupyta:</p>
            <p className="font-bold text-success">{savings.toFixed(2)}€</p>
                        
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center m-2'> 
        <label htmlFor="my-modal" className="btn">Redaguoti duomenys</label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        
        <div className="modal">
          <div className="modal-box w-96">
            <div className="modal-action mt-0">
              <label htmlFor="my-modal" className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>
            </div>
            <UserDataForm />
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-6">
        <SavingsProductSuggestions savings={savings} keywords={userData.keywords} />
      </div>
    </div>
  );
};

export default DisplayUserData;
