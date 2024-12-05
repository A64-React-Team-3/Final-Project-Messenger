import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppProvider } from "./store/UserAppProvider";
import { TeamAppProvider } from "./store/TeamAppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "./store/LanguageAppProvider";

const App: React.FC = () => {
  return (
    <>
      <LanguageProvider>
        <UserAppProvider>
          <TeamAppProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TeamAppProvider>
        </UserAppProvider>
        <ToastContainer />
      </LanguageProvider>
    </>
  );
};

export default App;
