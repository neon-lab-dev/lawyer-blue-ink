import leftArrow from "../../assets/icons/left-arrow.svg"
import ExcelSheet from "./ExcelSheet";
import SelectedTemplate from "./SelectedTemplate";
import UploadTemplate from "./UploadTemplate";

const SendEmail = () => {
  return <div className="flex flex-col gap-6">
    <img className="w-[44px]" src={leftArrow} alt="" />
    <h1 className="text-text text-base font-work-sans font-semibold">Excel Sheet</h1>
    <ExcelSheet/>
    <UploadTemplate/>
    <SelectedTemplate/>
    </div>;
};
export default SendEmail;
