import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { useInput } from "./useInput";
import * as S from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    const { data } = useInput({ error });

    return (
      <S.Container>
        {label && <S.Label htmlFor={props.id}>{label}</S.Label>}
        <S.InputWrapper hasError={data.hasError}>
          <S.StyledInput ref={ref} {...props} />
        </S.InputWrapper>
        {data.showHelperText && (
          <S.HelperText hasError={data.hasError}>
            {error || helperText}
          </S.HelperText>
        )}
      </S.Container>
    );
  },
);

Input.displayName = "Input";
