import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- LOGIN ---
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // --- SIGNUP ---
  const signup = async (email, password, name, phone) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const newUserData = {
      name,
      email,
      phone,
      role: "user",
    };

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, newUserData);

    // ✅ Set userData immediately (prevent race condition)
    setUserData(newUserData);
    return userCredential;
  };

  // --- LOGOUT ---
  const logout = () => {
    return signOut(auth);
  };

  // --- AUTH STATE LISTENER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setIsAdmin(data.role === "admin");
          } else {
            // If no document found (possibly a newly registered user)
            setUserData(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
          setIsAdmin(false);
        }
      } else {
        // Not logged in
        setUserData(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    // ✅ Return unsubscribe to clean up listener
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ No need to include userData as a dependency

  // --- VALUE FOR CONTEXT ---
  const value = {
    currentUser,
    userData,
    setUserData,
    isLoggedIn: !!currentUser,
    isAdmin,
    login,
    signup,
    logout,
    loading,
  };

  // ✅ Render children only after loading completes (prevent early redirect)
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
