import React, { useContext, useEffect } from "react";
import { UserAppContext } from "../../store/user.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  if (loading) {
    return (
      <>
        <h2>loading....</h2>
      </>
    );
  }
  return <div>{children}</div>;
};

export default Authenticated;
