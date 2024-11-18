import Login from "../Login/Login";
import "./Anonymous.css";
import { useState } from "react";

export default function Anonymous() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="main-anonymous-view">
      <div className="app-info">Some info</div>
      <div className="login-register-form">
        <Login />
      </div>
    </div>
  );
};