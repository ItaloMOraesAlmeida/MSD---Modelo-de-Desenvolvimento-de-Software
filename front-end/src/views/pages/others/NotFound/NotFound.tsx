import { useNavigate } from "react-router-dom";
import { Button } from "../../../../layouts/components/Button";
import * as S from "./styles";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <S.Content>
        <S.ErrorCode>404</S.ErrorCode>
        <S.Title>Página não encontrada</S.Title>
        <S.Description>
          Desculpe, a página que você está procurando não existe ou foi movida.
        </S.Description>
        <Button onClick={handleGoBack} size="lg">
          Voltar para página anterior
        </Button>
      </S.Content>
    </S.Container>
  );
};
