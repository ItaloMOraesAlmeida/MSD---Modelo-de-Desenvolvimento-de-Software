import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { useButton } from "./useButton";
import * as S from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { data } = useButton({ loading, disabled });

    return (
      <S.StyledButton
        ref={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={data.isDisabled}
        {...props}
      >
        {loading ? <S.Spinner /> : children}
      </S.StyledButton>
    );
  },
);

Button.displayName = "Button";
