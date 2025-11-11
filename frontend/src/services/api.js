import axios from "axios";
import { db } from './firebase'; // Import Firestore db from your firebase.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  collectionGroup,
  orderBy
} from "firebase/firestore";

// --- Your Original Axios Instance ---
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
export default api;


// =========================================
// == USER FUNCTIONS
// =========================================

export const getUserProfile = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such user document!");
  }
};

export const updateUserProfile = async (userId, updates) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, updates);
};


// =========================================
// == BOOKING FUNCTIONS (User Subcollection)
// =========================================

export const createBooking = async (bookingData) => {
  try {
    const userId = bookingData.userId;
    if (!userId) throw new Error("User ID is missing from booking data");

    const userBookingsCol = collection(db, "users", userId, "bookings");
    const docRef = await addDoc(userBookingsCol, bookingData);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Gets all bookings from *inside* a specific user's subcollection
export const getUserBookings = async (userId) => {
  const bookings = [];
  // Path: /users/{userId}/bookings
  const userBookingsCol = collection(db, "users", userId, "bookings");

  // --- THIS IS THE FIX ---
  // I removed 'orderBy("date", "desc")' to prevent the index error.
  const q = query(userBookingsCol);

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    bookings.push({ id: doc.id, ...doc.data() });
  });

  return bookings;
};

// Updates a specific booking *inside* a user's subcollection
export const updateBooking = async (userId, bookingId, updates) => {
  if (!userId) throw new Error("User ID is missing");
  const bookingDocRef = doc(db, "users", userId, "bookings", bookingId);
  await updateDoc(bookingDocRef, updates);
};

// Deletes a specific booking *inside* a user's subcollection
export const deleteBooking = async (userId, bookingId) => {
  if (!userId) throw new Error("User ID is missing");
  const bookingDocRef = doc(db, "users", userId, "bookings", bookingId);
  await deleteDoc(bookingDocRef);
};


// =========================================
// == SERVICE FUNCTIONS
// =========================================

export const getServices = async () => {
  const services = [];
  const servicesCollection = collection(db, "services");

  const querySnapshot = await getDocs(servicesCollection);
  querySnapshot.forEach((doc) => {
    services.push({ id: doc.id, ...doc.data() });
  });
  return services;
};


// =========================================
// == ADMIN FUNCTIONS
// =========================================

export const getAllBookings = async () => {
  const bookings = [];
  // This query requires the index you created in Firebase.
  const q = query(collectionGroup(db, "bookings"), orderBy("date", "desc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    bookings.push({ id: doc.id, ...doc.data() });
  });
  return bookings;
};