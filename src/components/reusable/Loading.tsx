import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <MoonLoader size={32} color="#1E40AF" />
    </div>
  );
};
export default Loading;
