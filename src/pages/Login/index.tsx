import { useState } from "react";
import eyeClosed from "../../assets/icons/eye-closed.svg";
import eyeOpen from "../../assets/icons/eye-open.svg";
import logo from "../../assets/icons/logo.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@/components/reusable/Button";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const handleLogin = (data: FormData) : void => {
    console.log(data);
    navigate("/")
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white border rounded-lg px-10">
      <div className="w-full md:w-[366px] flex flex-col gap-6 p-10 rounded-lg bg-white border border-[#E5E7EB]">
        {/* Logo */}
        <div className="flex flex-col gap-[21px] justify-center items-center">
          <img className="w-[66px]" src={logo} alt="" />
          <h1 className="font-lato text-2xl text-text font-bold">Login</h1>
        </div>

        {/* Input fields and submit btn */}
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">
           
            <div className="flex flex-col gap-1">
            <div className="relative flex gap-2 items-center bg-white border border-[#D0D0D0] rounded px-6 h-[64px] w-full">
              <input
                className="w-full h-full focus:outline-none"
                placeholder="User Id"
                type="number"
                {...register('email', { required: 'User Id required' })}
              />
              
            </div>
            {errors.email && <span className="text-rose-600 font-inter">{errors.email?.message}</span>}
            </div>

            

            <div className="flex flex-col gap-1">
            <div className="relative flex gap-2 items-center bg-white border border-[#D0D0D0] rounded px-6 h-[64px] w-full">
              <input
                className="w-full h-full focus:outline-none"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register('password', { required: 'Password required' })}
              />
              
              <div
                onClick={handlePasswordToggle}
                className="absolute right-0 px-6 cursor-pointer"
              >
                {showPassword ? (
                  <img className="w-5 h-5" src={eyeClosed} alt="" />
                ) : (
                  <img className="w-5 h-5" src={eyeOpen} alt="" />
                )}
              </div>
            </div>
            {errors.password && <span className="text-rose-600 font-lato">{errors.password?.message}</span>}
            </div>

            <Button className="mt-4">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
