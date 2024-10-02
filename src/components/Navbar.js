import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/shop" className="text-white text-xl font-bold">
          Scatch
        </Link>
        <div className="space-x-4">
          <Link to="/shop" className="text-white hover:text-blue-200">
            Shop
          </Link>
          <Link to="/profile" className="text-white hover:text-blue-200">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-blue-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;