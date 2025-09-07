import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Email/Password Signup
export const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Email/Password Login
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Google Login
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Logout
export const logout = () => signOut(auth);

// Auth Listener
export const subscribeToAuthChanges = (callback) =>
  onAuthStateChanged(auth, callback);
