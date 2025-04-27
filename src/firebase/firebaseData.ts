import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./index";

export const saveOrUpdateData = async (
  price: number,
  quitTime: string,
  frequency: number,
  keywords: string[],
  username: string
) => {
;

  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const userDocRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(userDocRef);

    const savingsPerDay = (price / 20) * frequency;
    const quitDate = new Date(quitTime);
    const today = new Date();
    const diffTime = today.getTime() - quitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const savings = savingsPerDay * diffDays;

    const commonData = {
      price,
      quitTime,
      frequency,
      savings,
      keywords,
      username,
    };

    if (docSnap.exists()) {
      await setDoc(userDocRef, {
        ...commonData,
        updatedAt: new Date(),
      }, { merge: true });
    } else {
      await setDoc(userDocRef, {
        ...commonData,
        createdAt: new Date(),
      });
    }
  } catch (e) {
    throw e;
  }
};
