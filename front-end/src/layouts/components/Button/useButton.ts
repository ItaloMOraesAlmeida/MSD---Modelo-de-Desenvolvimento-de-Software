import { useMemo } from "react";

interface UseButtonProps {
  loading?: boolean;
  disabled?: boolean;
}

interface UseButtonReturn {
  data: {
    isDisabled: boolean;
  };
}

export const useButton = ({
  loading,
  disabled,
}: UseButtonProps): UseButtonReturn => {
  const data = useMemo(
    () => ({
      isDisabled: loading || disabled || false,
    }),
    [loading, disabled],
  );

  return { data };
};
