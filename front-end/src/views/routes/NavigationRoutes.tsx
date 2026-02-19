import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/public/Login/Login";
import { Home } from "../pages/private/Home/Home";
import { NotFound } from "../pages/others/NotFound/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import { useAuthStore } from "../../application/store/useAuthStore";

export const NavigationRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          }
        />

        {/* Rotas privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
