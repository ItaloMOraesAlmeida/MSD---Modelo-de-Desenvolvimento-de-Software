import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../application/schemas/loginSchema";
import type { LoginFormData } from "../../../../application/schemas/loginSchema";
import { useLogin } from "../../../../application/api/useLogin";

export const useLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { data, actions } = useLogin();

  const onSubmit = handleSubmit(async (formData) => {
    await actions.login(formData);
  });

  return {
    data: {
      errors,
      loading: data.loading,
    },
    actions: {
      register,
      onSubmit,
    },
  };
};
