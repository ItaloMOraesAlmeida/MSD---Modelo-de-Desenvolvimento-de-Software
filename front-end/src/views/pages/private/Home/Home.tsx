import { Button } from "../../../../layouts/components/Button";
import { useAuthStore } from "../../../../application/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

export const Home = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>Bem-vindo ao Treinamento MDS!</S.Title>
        <S.Message>
          Esta página está em desenvolvimento e em breve terá mais
          funcionalidades.
        </S.Message>
        <S.SubMessage>
          Você está autenticado e pode navegar pela aplicação.
        </S.SubMessage>
        <Button onClick={handleLogout} variant="outline" size="lg">
          Sair
        </Button>
      </S.Content>
    </S.Container>
  );
};
