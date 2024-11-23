import React, { useContext, useEffect, useState } from "react";
import { UserAppContext } from "../../store/app-context";
import { toast } from "react-toastify";
import { Navigate, redirect, replace, useNavigate } from "react-router-dom";

type AuthenticatedProps = {
  /** React components to render if the user is authenticated */
  children: React.ReactNode;
};
/**
 * Authenticated Component
 *
 * This component ensures that its children components are only accessible to authenticated users.
 * If the user is not authenticated, they are redirected to the home page, where the login and register forms are.
 *
 * @component
 * @param {AuthenticatedProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
}: AuthenticatedProps): JSX.Element => {
  const { user, loading } = useContext(UserAppContext);
  // const { loading, setLoading } = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      toast.dark("❗Please login first!");

      // redirect("/");
      if (!user) {
        console.log("test");
        navigate("/");
      }
    }
  }, [user, loading]);
  if (loading) {
    return (
      <>
        <h2>loading....</h2>
      </>
    );
  }
  // if (!user) {
  //   toast.dark("❗Please login first!");
  //   navigate("/");
  //   return <></>;
  //   // return <Navigate to="/" />;
  // } else {
  //   return <div>{children}</div>;
  // }
  return <div>{children}</div>;
  // return (
  //   {user ?  <></> :  <></> }

  // )
  // return <Navigate to="/" />;
  // useEffect(() => {
  //   if (!user) {
  //     toast.dark("❗Please login first!");
  //     // redirect("/");
  //     navigate("/");
  //   }
  // }, [user]);
  // const [isUserAuth, setIsUserAuth] = useState(false);
  // useEffect(() => {
  //   if (user) {
  //     setIsUserAuth(false);
  //   } else {
  //     setIsUserAuth(true);
  //   }
  // }, [user]);
  // if (isUserAuth) {
  //   return <div>{children}</div>;
  // } else {
  //   toast.dark("❗Please login first!");
  //   // redirect("/");
  //   return <Navigate to="/" />;
  // }
};

export default Authenticated;
