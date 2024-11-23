import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Anonymous.css";
import { useContext, useEffect, useState } from "react";
import { UserAppContext } from "../../store/app-context";
import { useNavigate } from "react-router-dom";

export default function Anonymous() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const { user, loading } = useContext(UserAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/home");
      }
    }
  }, [loading, user]);

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
      {user ? (
        <div className="app-info">Logged in as {user?.displayName}</div>
      ) : (
        <div className="app-info">Some info</div>
      )}
      <div className="login-register-form">
        {showLogin && <Login handleShowRegister={handleShowRegister} />}
        {showRegister && <Register handleShowLogin={handleShowLogin} />}
      </div>
    </div>
  );
}
