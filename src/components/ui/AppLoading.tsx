import { MoonLoader } from "react-spinners";

const AppLoading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MoonLoader size={32} color="#1E40AF" />
    </div>
  );
};
export default AppLoading;
