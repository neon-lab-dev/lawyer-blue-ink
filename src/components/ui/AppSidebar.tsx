import { Link, useLocation } from "react-router-dom";
import overview from "../../assets/icons/Sidebar icons/overview.svg";
import email from "../../assets/icons/Sidebar icons/mail_lock.svg";
import upload from "../../assets/icons/Sidebar icons/upload.svg";
import user from "../../assets/images/user.png";

const AppSidebar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    {
      label: "Upload Template",
      path: "/",
      icon : upload,
    },
    {
      label: "Send Email",
      path: "/send-email",
      icon : email,
    },
    {
      label: "View Templates",
      path: "/view-templates",
      icon : overview,
    },
  ]
  return <div className="w-[271px] h-full bg-[#FAFAFF]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-[10px] bg-headerLeft h-[75px] pl-[26px]">
          <div className="w-[45px] h-[43px] rounded-xl flex justify-center items-center bg-white">
          <img src={user} alt="UserImg" />
          </div>
          <h1 className="font-work-sans text-[15px] font-normal text-primary">Mayank Goel</h1>
        </div>
        

        {/* Navlinks */}
      <div className="flex flex-col">

      {
        navLinks.map((link, index) => 
        <Link 
        key={index} 
        to={link.path}
        className={`flex items-center gap-[14px] px-[26px] py-4 text-[16px] font-work-sans font-normal text-primary
        ${pathname === link.path ? "bg-tab-container font-semibold" : "bg-none"}
        `}
        >
            <img src={link.icon} alt="" />
          {link?.label}
        </Link>
        )
      }

      </div>
      </div>
  </div>;
};
export default AppSidebar;

