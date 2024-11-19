import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAppContext } from "../../stores/app-context";
import { toast } from "react-toastify";
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

  useEffect(() => {
    if (!user) {
      toast.dark("❗Please log in to access this page.");
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return <div>{children}</div>;
};

export default Authenticated;
