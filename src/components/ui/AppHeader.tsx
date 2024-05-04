import { Link, useLocation } from "react-router-dom";
import rightArrow from "../../assets/icons/right-arrow.svg";

const AppHeader = () => {
  const { pathname } = useLocation();

  const covertToUpperCase = (str: string) => {
    return str
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-full h-[80px] bg-header flex items-center gap-[18px] px-9 py-5">
      <Link
        to={"/"}
        className="text-text font-work-sans text-base font-normal leading-normal"
      >
        Dashboard
      </Link>
      <img className="w-6 h-6" src={rightArrow} alt="" />
      <h1 className="text-tab-activation font-work-sans text-base font-semibold leading-normal">
        {covertToUpperCase(pathname.split("/")[1] || "Upload Template")}
      </h1>
    </div>
  );
};
export default AppHeader;
