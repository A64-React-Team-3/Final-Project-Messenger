import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppContext } from "./store/app-context";
import { User } from "./store/app-context";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/user.service";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const [authUser] = useAuthState(auth);

  useEffect(() => {
    if (authUser) {
      getUserData(authUser.uid).then((userData) => {
        setUser({
          email: authUser.email,
          uid: authUser.uid,
          userData: userData.val()[Object.keys(userData.val())[0]],
        });
      });
    }
  }, [authUser]);


  return (
    <UserAppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserAppContext.Provider >

  );
};

export default App;
