import React from "react";
import AppRoute from "./AppRoute";
import { AuthProvider } from "./store/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <AppRoute />
      <ToastContainer />
    </AuthProvider>
  );
}
