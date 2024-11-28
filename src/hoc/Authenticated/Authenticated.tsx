import React, { useContext, useEffect } from "react";
import { UserAppContext } from "../../store/user.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const { user, loading, error } = useContext(UserAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      toast.error(error);
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
  return <div>{children}</div>;
};

export default Authenticated;
