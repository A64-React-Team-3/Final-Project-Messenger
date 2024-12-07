import React, { useState, useEffect } from "react";
import { UserAppContext } from "./user.context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import { getUser } from "../services/user.service";
import { UserModel } from "../models/UserModel";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { db } from "../config/firebase-config";
import { transformUser } from "../helper/helper";
import { toast } from "react-toastify";
interface UserAppProviderProps {
  children: React.ReactNode;
}

export const UserAppProvider: React.FC<UserAppProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [authUser, loading] = useAuthState(auth);

  useEffect(() => {
    if (authUser) {
      getUser(authUser.uid)
        .then(userData => {
          setUser(userData);
        })
        .catch(error => {
          console.error("Failed to fetch user data:", error.message);
          toast.error("Failed to fetch user data");
          setUser(null);
          // setError(error.message);
        });
      // .finally(() => {
      //   setLoading(false);
      // });
    } else {
      setUser(null);
      // setLoading(false);
    }
  }, [authUser]);


  return (
    <UserAppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserAppContext.Provider>
  );
};
