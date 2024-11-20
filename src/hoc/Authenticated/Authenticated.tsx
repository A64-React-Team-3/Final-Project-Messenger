import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAppContext } from "../../store/app-context";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
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
  const { user } = useContext(UserAppContext);
  const navigate = useNavigate();
  const [authUser] = useAuthState(auth);

  useEffect(() => {
    if (!authUser || !user) {
      //     toast.dark("❗Please log in to access this page.");
      navigate("/", { replace: true });
    }
  }, [authUser, user]);
  // useEffect(() => {
  //   console.log("user", user);

  //   if (!user || !authUser) {
  //     toast.dark("❗Please log in to access this page.");
  //     navigate("/", { replace: true });
  //   }
  // }, [user, navigate, authUser]);
  // if (!user) {
  //   toast.dark("❗Please log in to access this page.");
  //   // setTimeout(() => {
  //   //   navigate("/", { replace: true });
  //   // }, 1000);
  //   navigate("/", { replace: true });
  //   // return <Navigate to="/" replace />;
  // }

  return <div>{children}</div>;
};

export default Authenticated;
