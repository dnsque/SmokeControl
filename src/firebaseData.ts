import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Импорт Firebase

// Функция для обновления данных пользователя
export const saveOrUpdateData = async (price: number, quitTime: string, frequency: number) => {
  const user = auth.currentUser; // Получаем текущего пользователя

  if (!user) {
    console.error("Нет авторизованного пользователя!");
    return;
  }

  try {
    const userDocRef = doc(db, "userData", user.uid); // Используем UID как ID документа
    const docSnap = await getDoc(userDocRef); // Проверяем, есть ли документ
    const savings = price/20 * frequency; // Расчет экономии за месяц

    if (docSnap.exists()) {
      // Если данные уже есть — обновляем их
      await setDoc(userDocRef, {
        price,
        quitTime,
        frequency,
        savings,
        updatedAt: new Date(),
      }, { merge: true });

      console.log("Данные обновлены!");
    } else {
      // Если данных нет — создаем новый документ
      await setDoc(userDocRef, {
        price,
        quitTime,
        frequency,
        savings,
        createdAt: new Date(),
      });

      console.log("Новый документ создан!");
    }
  } catch (e) {
    console.error("Ошибка при сохранении данных: ", e);
  }
};
