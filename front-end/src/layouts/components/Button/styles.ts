import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { theme } from "../../globalStyles";

interface StyledButtonProps {
  variant: "primary" | "secondary" | "outline" | "ghost";
  size: "sm" | "md" | "lg";
  fullWidth: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary.dark};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.secondary.main};
    color: ${theme.colors.secondary.contrast};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.secondary.dark};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${theme.colors.primary.main};
    border: 1px solid ${theme.colors.primary.main};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary.main};
      color: ${theme.colors.primary.contrast};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.primary.main};
    border: none;

    &:hover:not(:disabled) {
      background-color: rgba(59, 130, 246, 0.1);
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: ${theme.fontSize.sm};
  `,
  md: css`
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.fontSize.base};
  `,
  lg: css`
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: ${theme.fontSize.lg};
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: ${theme.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all
    ${`${theme.transitions.duration.normal} ${theme.transitions.easing.easeInOut}`};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary.light};
    outline-offset: 2px;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
