import React, { useState, useEffect } from "react";
import { saveOrUpdateData } from "../firebaseData";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserForm: React.FC = () => {
  const [price, setPrice] = useState<number>(0);
  const [quitTime, setQuitTime] = useState<string>("");
  const [frequency, setFrequency] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        const userDocRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPrice(data.price || 0);
          setQuitTime(data.quitTime || "");
          setFrequency(data.frequency || 0);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await saveOrUpdateData(price, quitTime, frequency);
      setMessage("Duomenys sėkmingai išsaugoti!");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      setMessage("Klaida išsaugant duomenis.");
      setTimeout(() => setMessage(""), 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold text-center m-4">Duomenų forma</h2>
      {loading && <p className="text-center">Kraunasi...</p>} {/* Loading indicator */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Pakuotės kaina: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Metimo data</label>
          <input
            type="date"
            value={quitTime}
            onChange={(e) => setQuitTime(e.target.value)}
            className="mt-1 input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rūkymo dažnis (per dieną cigarečių)</label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="mt-1 input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary"
          disabled={loading} // Disable button during loading
        >
          Išsaugoti duomenis
        </button>
      </form>

      {message && <p className="mt-4 text-center text-success">{message}</p>}
    </div>
  );
};

export default UserForm;
