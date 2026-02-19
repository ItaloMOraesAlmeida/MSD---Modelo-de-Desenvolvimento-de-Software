import { useMemo } from "react";

interface UseInputProps {
  error?: string;
}

interface UseInputReturn {
  data: {
    hasError: boolean;
    showHelperText: boolean;
  };
}

export const useInput = ({ error }: UseInputProps): UseInputReturn => {
  const data = useMemo(
    () => ({
      hasError: !!error,
      showHelperText: !!error,
    }),
    [error],
  );

  return { data };
};
