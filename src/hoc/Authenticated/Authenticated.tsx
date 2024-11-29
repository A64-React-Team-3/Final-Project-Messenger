import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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
  const navigate = useNavigate();
  const [authUser, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      toast.error("Error");
      if (!authUser) {
        console.log("test");
        navigate("/");
      }
    }
  }, [authUser, loading]);
  if (authUser) {
    return <div>{children}</div>;
  } else {
    return <LoadingSpinner />;
  }
};

export default Authenticated;
