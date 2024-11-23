import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppContext } from "./store/app-context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUser } from "./services/user.service";
import { User } from "./models/User";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const [authUser] = useAuthState(auth);

  useEffect(() => {
    try {
      if (authUser) {
        getUser(authUser.uid).then(userData => {
          setUser(userData);
        });
      }
    } catch (err: any) {
      console.log(err);
    }

  }, [authUser]);

  return (
    <UserAppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserAppContext.Provider>
  );
};

export default App;
