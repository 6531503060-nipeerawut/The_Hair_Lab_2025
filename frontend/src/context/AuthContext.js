import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase"; // <-- Import from your new file
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // <-- Import firestore functions

export const AuthContext = createContext();

// Create a hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // This is the Firebase user object
  const [userData, setUserData] = useState(null); // This is your user data from Firestore
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for initial auth check

  // Firebase login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Firebase signup function
  const signup = async (email, password, name, phone) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Now, create a user document in Firestore
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      name: name,
      email: email,
      phone: phone,
      role: "user", // Default role
    });

    return userCredential;
  };

  // Firebase logout function
  const logout = () => {
    return signOut(auth);
  };

  // This is the core!
  // It listens for auth changes and updates state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user); // Set the Firebase user

      if (user) {
        // User is logged in. Now, get their data from Firestore.
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data); // Set the extra user data (name, phone)

          // Check for admin role
          // Note: A secure way is using Firebase Custom Claims
          // For now, we'll check a 'role' field in their Firestore document
          setIsAdmin(data.role === "admin");

        } else {
          // This case should ideally not happen if signup is correct
          console.log("No user data found in Firestore!");
          setUserData(null);
          setIsAdmin(false);
        }
      } else {
        // User is logged out
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false); // Done checking auth
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  const value = {
    currentUser,
    userData,
    isLoggedIn: !!currentUser, // True if currentUser is not null
    isAdmin,
    login,
    signup,
    logout,
    loading, // <-- ADD THIS LINE
  };

  // Render children only after the initial auth check is complete
  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  );
};