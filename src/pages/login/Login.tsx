import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LoginReq, LoginRes } from "../../types/Login";
import { createEntity } from "../../services/BackendService";
import { API_LOGIN_PATH } from "../../config";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const formMethods = useForm<LoginReq>();

  async function onSubmit<LoginReq>(body: LoginReq) {
    try {
      const res = await createEntity<LoginReq, LoginRes>(API_LOGIN_PATH, body);
      setToken(res.token);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Input type="text" name="email" label="Correo Electrónico" />
          <Input type="password" name="password" label="Contraseña" />
          <Button text="Enviar" type="submit" />
        </form>
      </FormProvider>
    </>
  );
}
