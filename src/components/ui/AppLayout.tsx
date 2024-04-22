import { useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useInnerSize } from "@/hooks/useInnerSize";
import NotSupported from "@/pages/Error/NotSupported";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  const { pathname } = useLocation();

  // does not support mobile devices
  const size = useInnerSize();
  if (size.width < 768 || size.height < 500) {
    return <NotSupported />;
  }

  // login does not have the layout
  if (pathname === "/login") return props.children;
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
