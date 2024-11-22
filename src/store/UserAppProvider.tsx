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
          setUser(null); // Ensure state consistency in case of failure
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [authUser]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner component
  }

  return (
    <UserAppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserAppContext.Provider>
  );
};
