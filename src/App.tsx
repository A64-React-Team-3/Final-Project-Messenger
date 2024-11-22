import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppProvider } from "./store/UserAppProvider";

const App: React.FC = () => {
  return (
    <UserAppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserAppProvider>
  );
};

export default App;
