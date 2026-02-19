import { Toaster } from "react-hot-toast";
import { GlobalStyles } from "./layouts/globalStyles";
import { NavigationRoutes } from "./views/routes/NavigationRoutes";

function App() {
  return (
    <>
      <GlobalStyles />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <NavigationRoutes />
    </>
  );
}

export default App;
