import React, { useState, useEffect } from "react";
import { UserAppContext, User } from "./app-context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import { getUserData } from "../services/user.service";

interface UserAppProviderProps {
  children: React.ReactNode;
}

export const UserAppProvider: React.FC<UserAppProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser] = useAuthState(auth);

  useEffect(() => {
    if (authUser) {
      getUserData(authUser.uid)
        .then(userData => {
          const userValue = {
            email: authUser.email,
            uid: authUser.uid,
            userData: userData.val()[Object.keys(userData.val())[0]],
          };
          setUser(userValue);
        })
        .catch(error => {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [authUser]);

  return (
    <UserAppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserAppContext.Provider>
  );
};
