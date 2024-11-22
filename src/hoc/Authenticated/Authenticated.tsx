import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAppContext, User } from "../../store/app-context";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { redirect } from "react-router-dom";
type AuthenticatedProps = {
  /** React components to render if the user is authenticated */
  children: React.ReactNode;
};
// // Utility to get the user from localStorage if not available in context
// const getUserFromLocalStorage = () => {
//   const storedUser = localStorage.getItem("user");
//   return storedUser ? JSON.parse(storedUser) : null;
// };
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
  const navigate = useNavigate();
  const [authUser] = useAuthState(auth);

  // if (loading) {
  //   return <div>Loading...</div>; // Or use a loading spinner
  // }
  // useEffect(() => {
  //   if (!user) {
  //     toast.dark("❗Please log in to access this page.");
  //     navigate("/", { replace: true });
  //   }
  // }, [user, navigate]); // Run effect only when user changes

  // Render children if the user is authenticated
  // if (!user) {
  //   return <></>; // Avoid rendering the children if not authenticated
  // }
  // if (loading) {
  //   return <div>Loading...</div>; // Replace with a spinner component if available
  // }
  // if (!authUser || !user) {
  //   toast.dark("❗Please log in to access this page.");
  //   navigate("/", { replace: true });
  //   return <></>;
  // }
  // useEffect(() => {
  //   if (!authUser || !user) {
  //     //     toast.dark("❗Please log in to access this page.");
  //     navigate("/", { replace: true });
  //   }
  // }, [authUser, user]);
  // useEffect(() => {
  //   console.log("user", user);

  // if (!user || !authUser) {
  //   toast.dark("❗Please log in to access this page.");
  //   // navigate("/");
  //   return (
  //     <>
  //       <Navigate to="/" />
  //     </>
  //   );
  // } else {
  //   return <div>{children}</div>;
  // }

  // useEffect(() => {
  //   const currentUser = user || getUserFromLocalStorage();

  //   if (!currentUser) {
  //     toast.dark("❗Please log in to access this page.");
  //     navigate("/", { replace: true });
  //   }
  // }, [user]);
  if (!user) {
    // If the user is not authenticated, redirect to the anonymous page
    redirect("/");
  }
  return <div>{children}</div>;

  // }, [user, navigate, authUser]);
  // if (!user) {
  //   toast.dark("❗Please log in to access this page.");
  //   // setTimeout(() => {
  //   //   navigate("/", { replace: true });
  //   // }, 1000);
  //   navigate("/", { replace: true });
  //   // return <Navigate to="/" replace />;
  // }
};

export default Authenticated;
