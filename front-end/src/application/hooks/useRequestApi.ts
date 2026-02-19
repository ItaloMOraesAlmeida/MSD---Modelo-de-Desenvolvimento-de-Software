import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface MessageDto {
  code: number;
  type: "success" | "error" | "warning" | "info";
  text: string;
  exceptionMessage?: string;
}

export interface PaginationDto {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface OrdinationDto {
  direction: "asc" | "desc";
  orderBy: string;
}

export interface BaseResponseDto<T> {
  data: T;
  message: MessageDto;
}

export interface GetResponseDto<T> extends BaseResponseDto<T> {
  pagination?: PaginationDto;
  ordernation?: OrdinationDto;
}

interface UseRequestApiReturn {
  loading: boolean;
  error: string | null;
  get: <T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ) => Promise<GetResponseDto<T> | null>;
  post: <T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<BaseResponseDto<T> | null>;
  put: <T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<BaseResponseDto<T> | null>;
  del: <T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ) => Promise<BaseResponseDto<T> | null>;
}

export const useRequestApi = (): UseRequestApiReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown) => {
    let errorMessage = "Erro ao processar requisição";

    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<BaseResponseDto<unknown>>;

      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message.text;

        if (axiosError.response.data.message.exceptionMessage) {
          console.error(
            "Exception:",
            axiosError.response.data.message.exceptionMessage,
          );
        }
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    setError(errorMessage);
    toast.error(errorMessage);
    return errorMessage;
  }, []);

  const handleSuccess = useCallback((message: MessageDto) => {
    if (message.type === "success") {
      toast.success(message.text);
    } else if (message.type === "warning") {
      toast(message.text, { icon: "⚠️" });
    } else if (message.type === "info") {
      toast(message.text, { icon: "ℹ️" });
    }
  }, []);

  const get = useCallback(
    async <T>(
      endpoint: string,
      config?: AxiosRequestConfig,
    ): Promise<GetResponseDto<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("@MDS:token");
        const response = await axios.get<GetResponseDto<T>>(
          `${API_BASE_URL}${endpoint}`,
          {
            ...config,
            headers: {
              ...config?.headers,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          },
        );

        if (response.data.message) {
          handleSuccess(response.data.message);
        }

        return response.data;
      } catch (err) {
        handleError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, handleSuccess],
  );

  const post = useCallback(
    async <T, D = unknown>(
      endpoint: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<BaseResponseDto<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("@MDS:token");
        const response = await axios.post<BaseResponseDto<T>>(
          `${API_BASE_URL}${endpoint}`,
          data,
          {
            ...config,
            headers: {
              ...config?.headers,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          },
        );

        if (response.data.message) {
          handleSuccess(response.data.message);
        }

        return response.data;
      } catch (err) {
        handleError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, handleSuccess],
  );

  const put = useCallback(
    async <T, D = unknown>(
      endpoint: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<BaseResponseDto<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("@MDS:token");
        const response = await axios.put<BaseResponseDto<T>>(
          `${API_BASE_URL}${endpoint}`,
          data,
          {
            ...config,
            headers: {
              ...config?.headers,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          },
        );

        if (response.data.message) {
          handleSuccess(response.data.message);
        }

        return response.data;
      } catch (err) {
        handleError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, handleSuccess],
  );

  const del = useCallback(
    async <T>(
      endpoint: string,
      config?: AxiosRequestConfig,
    ): Promise<BaseResponseDto<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("@MDS:token");
        const response = await axios.delete<BaseResponseDto<T>>(
          `${API_BASE_URL}${endpoint}`,
          {
            ...config,
            headers: {
              ...config?.headers,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          },
        );

        if (response.data.message) {
          handleSuccess(response.data.message);
        }

        return response.data;
      } catch (err) {
        handleError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, handleSuccess],
  );

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};
