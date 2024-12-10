import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Anonymous.css";
import { useContext, useEffect, useState } from "react";
import { UserAppContext } from "../../store/user.context";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import logo from "../../assets/final_logo.png";
export default function Anonymous() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useContext(UserAppContext);
  const [authUser, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/home");
    }
  }, [authUser]);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="flex flex-col items-center bg-base-200 h-screen relative">
        {/* <div className="app-info text-center text-lg text-secondary"></div> */}
        <div className="flex flex-col items-center justify-center w-full">
          <img className="w-36" src={logo} alt="logo" />
          <h1 className="h-12 text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary hover:underline transition-all duration-300 ">
            Definitely Not Discord
          </h1>
        </div>

        <div className="login-register-form mt-6 w-full max-w-md bg-base-100 p-4 shadow-lg rounded-lg flex justify-center ">
          {showLogin && <Login handleShowRegister={handleShowRegister} />}
          {showRegister && <Register handleShowLogin={handleShowLogin} />}
        </div>
      </div>
    );
  }
}
