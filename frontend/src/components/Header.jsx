import React, { useState } from "react";
import "./Header.css";
import Login from "./Login";
import Register from "./Register";
import { SiGooglemaps } from "react-icons/si";

const Header = ({ currentUser, setCurrentUser, localStorage }) => {
  const [showRegister, setShowRegister] = useState(null);
  const [showLogin, setShowLogin] = useState(null);
  return (
    <header>
      <div className="logo">
        <SiGooglemaps /> Travel Map
      </div>
      <nav>
        {/* Login Button */}
        {currentUser ? (
          <button
            className="Logout button"
            onClick={() => {
              localStorage.removeItem("user");
              setCurrentUser(null);
            }}
          >
            Logout
          </button>
        ) : (
          <div className="buttons">
            <button className="Login button" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="Register button"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && (
          <Register
            localStorage={localStorage}
            setCurrentUser={setCurrentUser}
            setShowRegister={setShowRegister}
          />
        )}
        {showLogin && (
          <Login
            localStorage={localStorage}
            setCurrentUser={setCurrentUser}
            setShowLogin={setShowLogin}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
