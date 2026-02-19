import styled from "@emotion/styled";
import { theme } from "../../globalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
`;

export const InputWrapper = styled.div<{ hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors.error.main : theme.colors.border.main};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.paper};
  transition: all
    ${`${theme.transitions.duration.fast} ${theme.transitions.easing.easeInOut}`};

  &:focus-within {
    outline: 2px solid
      ${({ hasError }) =>
        hasError ? theme.colors.error.light : theme.colors.primary.light};
    outline-offset: 2px;
    border-color: ${({ hasError }) =>
      hasError ? theme.colors.error.main : theme.colors.primary.main};
  }

  &:hover {
    border-color: ${({ hasError }) =>
      hasError ? theme.colors.error.dark : theme.colors.border.dark};
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${theme.colors.text.hint};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const HelperText = styled.span<{ hasError?: boolean }>`
  font-size: ${theme.fontSize.xs};
  color: ${({ hasError }) =>
    hasError ? theme.colors.error.main : theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs};
`;
