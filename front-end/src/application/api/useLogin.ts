import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestApi } from "../hooks/useRequestApi";
import { useAuthStore } from "../store/useAuthStore";
import type { LoginFormData } from "../schemas/loginSchema";

interface LoginResponseData {
  token: string;
}

export const useLogin = () => {
  const { post, loading, error } = useRequestApi();
  const navigate = useNavigate();
  const { login: setAuthToken } = useAuthStore();

  const login = useCallback(
    async (data: LoginFormData) => {
      const response = await post<LoginResponseData>("/auth/login", data);

      if (response?.data?.token) {
        setAuthToken(response.data.token);
        navigate("/home");
        return true;
      }

      return false;
    },
    [post, setAuthToken, navigate],
  );

  return {
    data: {
      loading,
      error,
    },
    actions: {
      login,
    },
  };
};
