import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase"; // <-- Import from your new file
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // --- THIS FUNCTION IS UPDATED ---
  const signup = async (email, password, name, phone) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create the data object
    const newUserData = {
      name: name,
      email: email,
      phone: phone,
      role: "user", // Default role
    };

    // Now, create a user document in Firestore
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, newUserData);

    // --- THIS IS THE FIX ---
    // Manually set the userData in our context
    // This prevents the race condition on signup
    setUserData(newUserData);
    // --------------------

    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setIsAdmin(data.role === "admin");
        } else {
          // This can happen on signup race condition,
          // but our new signup function fixes it.
          if (!userData) { // Only set to null if not already set by signup
            setUserData(null);
          }
          setIsAdmin(false);
        }
      } else {
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // --- THIS VALUE OBJECT IS UPDATED ---
  const value = {
    currentUser,
    userData,
    setUserData, // <-- ADD THIS so ProfilePage can use it
    isLoggedIn: !!currentUser,
    isAdmin,
    login,
    signup,
    logout,
    loading,
  };

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  );
};