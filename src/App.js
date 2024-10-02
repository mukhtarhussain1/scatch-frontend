import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/auth" />;
    }
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/shop" />} />
      </Routes>
    </Router>
  );
};

const AuthPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        <Register />
        <Login />
      </div>
    </div>
  );
};

export default App;
