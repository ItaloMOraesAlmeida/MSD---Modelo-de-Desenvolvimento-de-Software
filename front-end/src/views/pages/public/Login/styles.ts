import styled from "@emotion/styled";
import { theme } from "../../../../layouts/globalStyles";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.main} 0%,
    ${theme.colors.secondary.main} 100%
  );
  padding: ${theme.spacing.md};
`;

export const Card = styled.div`
  background-color: ${theme.colors.background.paper};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows["2xl"]};
  padding: ${theme.spacing["3xl"]};
  width: 100%;
  max-width: 400px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize["3xl"]};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

export const Subtitle = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.secondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const Footer = styled.div`
  margin-top: ${theme.spacing.lg};
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;
