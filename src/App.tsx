import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppProvider } from "./store/UserAppProvider";
import { TeamAppProvider } from "./store/TeamAppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <UserAppProvider>
        <TeamAppProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TeamAppProvider>
      </UserAppProvider>
      <ToastContainer />
    </>
  );
};

export default App;
