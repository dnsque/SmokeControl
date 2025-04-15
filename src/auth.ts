import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase"; // importuokite firebase konfigūraciją
type SuccessCallback = (path: string) => void;
// Prisijungimo funkcija
export const login = async (email: string, password: string, onSuccess: SuccessCallback) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully");
    onSuccess('/');
  } catch (error) {
    throw error;
  }
};

// Можно добавить функции для регистрации и выхода
export const register = async (email: string, password: string, onSuccess: SuccessCallback) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered successfully");
    onSuccess('/');
  } catch (error) {
    console.error("Error registering: ", error);
  }
};

export const logout = async (onSuccess: SuccessCallback) => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
    onSuccess('/');
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};
