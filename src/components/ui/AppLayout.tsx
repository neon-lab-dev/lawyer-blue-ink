import { Navigate, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useInnerSize } from "@/hooks/useInnerSize";
import NotSupported from "@/pages/Error/NotSupported";
import { useQuery } from "@tanstack/react-query";
import { handleGetMe } from "@/api/auth";
import AppLoading from "./AppLoading";
import { IUser } from "@/types/user.type";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  const { pathname } = useLocation();

  const { isLoading, isError, data } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: handleGetMe,
    retry: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // does not support mobile devices
  const size = useInnerSize();
  if (size.width < 768 || size.height < 500) {
    return <NotSupported />;
  }
  if (isLoading) return <AppLoading />;

  if (pathname === "/login") return props.children;

  if (isError) return <Navigate to="/login" />;
  if (!data || data.role !== "admin") return <Navigate to="/login" />;

  // login does not have the layout
  return (
    <div className="h-screen w-screen flex ">
      <AppSidebar />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <AppHeader />
        <main className="w-full h-full py-8 px-11 bg-background overflow-y-scroll scrollbar-md">
          {props.children}
        </main>
      </div>
    </div>
  );
};
export default RootLayout;
