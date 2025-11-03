// import api from "./api";

// export const getBookings = async () => {
//   const res = await api.get("/bookings");
//   return res.data;
// };

// export const getUserBookings = async (email) => {
//   const res = await api.get(`/bookings/user/${email}`);
//   return res.data;
// };

// export const addBooking = async (bookingData) => {
//   const res = await api.post("/bookings", bookingData);
//   return res.data;
// };

// export const updateBooking = async (id, updatedData) => {
//   const res = await api.put(`/bookings/${id}`, updatedData);
//   return res.data;
// };

// export const removeBooking = async (id) => {
//   await api.delete(`/bookings/${id}`);
//   return true;
// };

// export const revenueSum = async () => {
//   const res = await api.get("/admin/dashboard");
//   return res.data.totalRevenue || 0;
// };



// ✅ Mock store.js — ใช้จำลองข้อมูลระหว่างรอ backend จริง

// Mock ข้อมูลเริ่มต้น (จำลองฐานข้อมูล)
let bookings = [
  {
    id: 1,
    service: "Haircut",
    date: "2025-11-05",
    time: "09:00",
    price: "฿300",
    status: "confirmed",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@email.com",
  },
  {
    id: 2,
    service: "Hair Coloring",
    date: "2025-11-06",
    time: "14:00",
    price: "฿800",
    status: "pending",
    customerName: "John Smith",
    customerEmail: "john@email.com",
  },
  {
    id: 3,
    service: "Hair Treatment",
    date: "2025-11-07",
    time: "11:00",
    price: "฿600",
    status: "confirmed",
    customerName: "Emma Wilson",
    customerEmail: "emma@email.com",
  },
];

// ✅ ฟังก์ชันดึงรายการจองทั้งหมด (ใช้ใน admin dashboard)
export const getBookings = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return bookings;
};

// ✅ ฟังก์ชันดึงรายการจองเฉพาะ user
export const getUserBookings = async (email) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return bookings.filter((b) => b.customerEmail === email);
};

// ✅ เพิ่มการจองใหม่ (ใช้ในหน้า BookingPage)
export const addBooking = async (newBooking) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = bookings.length + 1;
  const booking = { id, ...newBooking };
  bookings.push(booking);
  console.log("✅ Added booking:", booking);
  return booking;
};

// ✅ อัปเดตสถานะการจอง (ใช้ใน admin page / reschedule)
export const updateBooking = async (id, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  bookings = bookings.map((b) => (b.id === id ? { ...b, ...updates } : b));
  console.log("✅ Updated booking:", id, updates);
  return bookings.find((b) => b.id === id);
};

// ✅ ลบการจอง (ใช้ใน modal Cancel)
export const removeBooking = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  bookings = bookings.filter((b) => b.id !== id);
  console.log("🗑️ Removed booking:", id);
  return true;
};

// ✅ รวมยอดรายได้ (ใช้ใน admin dashboard)
export const revenueSum = () => {
  return bookings.reduce((sum, b) => {
    const price = parseInt(b.price.replace("฿", "")) || 0;
    return sum + price;
  }, 0);
};
