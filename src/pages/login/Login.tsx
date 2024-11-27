import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LoginReq, LoginRes } from "../../types/Login";
import { createEntity } from "../../services/BackendService";
import { API_LOGIN_PATH } from "../../config";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/background.jpg";
import fablabLogo from "../../assets/images/fablab-logo.svg";

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
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className=" min-h-screen flex items-center justify-center bg-red-500 bg-opacity-80">
        <Toaster position="top-center" richColors />
        <FormProvider {...formMethods}>
          <div className="grid items-center justify-items-center gap-8 lg:grid-cols-[auto_1fr] p-8 m-4 bg-white rounded-xl shadow-lg">
            <img src={fablabLogo} className="w-20 lg:w-40 lg:m-8" />
            <div>
              <h1 className="font-bold mb-10 text-2xl text-center">
                Iniciar Sesión
              </h1>
              <form
                onSubmit={formMethods.handleSubmit(onSubmit)}
                className="grid gap-6 w-96"
              >
                <Input type="text" name="email" label="Correo Electrónico" />
                <Input type="password" name="password" label="Contraseña" />

                <Button
                  text="Iniciar Sesión"
                  icon="ic:round-login"
                  type="submit"
                  fullWidth={true}
                />
              </form>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
