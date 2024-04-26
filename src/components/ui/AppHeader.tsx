import { useLocation } from "react-router-dom";
import rightArrow from "../../assets/icons/right-arrow.svg"


const AppHeader = () => {
  const { pathname } = useLocation();

  const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // Get the title from the pathname, remove hyphens, capitalize first letters, and join them
  const title = pathname.substring(1)
    .split('-')
    .map(capitalizeFirstLetter)
    .join(' ');
  return <div className="w-full h-[80px] bg-header flex items-center gap-[18px] px-9 py-5">
    <h1 className="text-text font-work-sans text-base font-normal leading-normal">Dashboard</h1>
    <img className="w-6 h-6" src={rightArrow} alt="" />
    <h1 className="text-tab-activation font-work-sans text-base font-semibold leading-normal">{title}</h1>
    </div>;
};
export default AppHeader;
