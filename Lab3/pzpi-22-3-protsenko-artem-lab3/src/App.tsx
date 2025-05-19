import { RouterProvider } from "react-router-dom"
import GlobalStyle from "./global-style"
import router from "./pages/router/index"
import './locales/i18n';
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { checkAuth } from "helpers/Auth/check-auth";

function App() {

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Toaster
        position="top-right"
        
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
