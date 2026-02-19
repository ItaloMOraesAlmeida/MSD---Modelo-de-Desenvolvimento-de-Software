import styled from "@emotion/styled";
import { theme } from "../../../../layouts/globalStyles";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background.default};
  padding: ${theme.spacing.md};
`;

export const Content = styled.div`
  text-align: center;
  max-width: 500px;
`;

export const ErrorCode = styled.h1`
  font-size: ${theme.fontSize["5xl"]};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary.main};
  margin-bottom: ${theme.spacing.md};
`;

export const Title = styled.h2`
  font-size: ${theme.fontSize["2xl"]};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

export const Description = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing["2xl"]};
  line-height: ${theme.lineHeight.relaxed};
`;
