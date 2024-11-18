import Login from "../../../src/views/Login/Login";
import Register from "../Register/Register";
import "./Anonymous.css";
import { useState } from "react";

export default function Anonymous() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };


  return (
    <div className="main-anonymous-view">
      <div className="app-info">Some info</div>
      <div className="login-register-form">
        {showLogin && <Login handleShowRegister={handleShowRegister} />}
        {showRegister && <Register handleShowLogin={handleShowLogin} />}
      </div>
    </div>
  );
}
