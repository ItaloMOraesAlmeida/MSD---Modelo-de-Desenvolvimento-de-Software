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
  max-width: 600px;
  background-color: ${theme.colors.background.paper};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing["3xl"]};
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize["3xl"]};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

export const Message = styled.p`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md};
  line-height: ${theme.lineHeight.relaxed};
`;

export const SubMessage = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing["2xl"]};
  line-height: ${theme.lineHeight.normal};
`;
