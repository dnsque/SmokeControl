import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./index"; // Импортируем из index.ts

// Функция для обновления данных пользователя
export const saveOrUpdateData = async (price: number, quitTime: string, frequency: number) => {
  console.log("saveOrUpdateData вызван с параметрами:", { price, quitTime, frequency });
  
  const user = auth.currentUser; // Получаем текущего пользователя
  console.log("Текущий пользователь:", user ? user.uid : "не авторизован");

  if (!user) {
    console.error("Нет авторизованного пользователя!");
    return;
  }

  try {
    console.log("Firebase db инстанс:", db);
    const userDocRef = doc(db, "userData", user.uid); // Используем UID как ID документа
    console.log("Создана ссылка на документ:", userDocRef);
    
    const docSnap = await getDoc(userDocRef); // Проверяем, есть ли документ
    console.log("Документ существует:", docSnap.exists());
    
    const savings = price/20 * frequency; // Расчет экономии за месяц
    console.log("Расчитанная экономия:", savings);

    if (docSnap.exists()) {
      // Если данные уже есть — обновляем их
      console.log("Обновляем существующий документ");
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
      console.log("Создаем новый документ");
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
    throw e; // Перебрасываем ошибку для обработки в компоненте
  }
}; 