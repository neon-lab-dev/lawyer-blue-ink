import { Link, useLocation, useNavigate } from "react-router-dom";
import overview from "../../assets/icons/Sidebar icons/overview.svg";
import email from "../../assets/icons/Sidebar icons/mail_lock.svg";
import upload from "../../assets/icons/Sidebar icons/upload.svg";
import user from "../../assets/images/user.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "@/types/user.type";
import Button from "../reusable/Button";
import { handleLogout } from "@/api/auth";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const AppSidebar = () => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<IUser>(["me"]);

  const navLinks = [
    {
      label: "Upload Template",
      path: "/",
      icon: upload,
    },
    {
      label: "Send Email",
      path: "/send-email",
      icon: email,
    },
    {
      label: "View Templates",
      path: "/view-templates",
      icon: overview,
    },
  ];

  const navigate = useNavigate();

  //logout mutation
  const { mutate, isPending } = useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      toast.success("Logout successful, Redirecting...");
      queryClient.setQueryData(["me"], undefined);
      navigate("/login");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
  return (
    <div className="w-[271px] h-full bg-[#FAFAFF]">
      <div className="flex flex-col gap-6 h-full">
        <div className="flex items-center gap-[10px] bg-headerLeft h-[75px] pl-[26px]">
          <div className="w-[45px] h-[43px] rounded-xl flex justify-center items-center bg-white">
            <img src={user} alt="UserImg" />
          </div>
          <h1 className="font-work-sans text-[15px] font-normal text-primary">
            {data?.name}
          </h1>
        </div>

        {/* Navlinks */}
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col h-full">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center gap-[14px] px-[26px] py-4 text-[16px] font-work-sans font-normal text-primary
        ${
          pathname.split("/")[1] === link.path.split("/")[1]
            ? "bg-tab-container font-semibold"
            : "bg-none"
        }
        `}
              >
                <img src={link.icon} alt="" />
                {link?.label}
              </Link>
            ))}
          </div>
          <Button
            onClick={() => {
              mutate();
            }}
            className="mb-4 rounded-none py-4 text-red-500"
            variant="supportive"
          >
            {isPending ? <PulseLoader color="#cdcfd1" size={6} /> : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AppSidebar;
