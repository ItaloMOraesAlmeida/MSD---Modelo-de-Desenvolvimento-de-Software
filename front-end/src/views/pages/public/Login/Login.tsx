import { Input } from "../../../../layouts/components/Input";
import { Button } from "../../../../layouts/components/Button";
import { useLoginPage } from "./useLoginPage";
import * as S from "./styles";

export const Login = () => {
  const { data, actions } = useLoginPage();

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>Treinamento MDS</S.Title>
          <S.Subtitle>Faça login para continuar</S.Subtitle>
        </S.Header>

        <S.Form onSubmit={actions.onSubmit}>
          <Input
            {...actions.register("email")}
            id="email"
            type="email"
            label="Email"
            placeholder="seu@email.com"
            error={data.errors.email?.message}
            autoComplete="email"
          />

          <Input
            {...actions.register("password")}
            id="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            error={data.errors.password?.message}
            autoComplete="current-password"
          />

          <Button type="submit" fullWidth loading={data.loading}>
            Entrar
          </Button>
        </S.Form>

        <S.Footer>
          <p>© 2026 Treinamento MDS. Todos os direitos reservados.</p>
        </S.Footer>
      </S.Card>
    </S.Container>
  );
};
