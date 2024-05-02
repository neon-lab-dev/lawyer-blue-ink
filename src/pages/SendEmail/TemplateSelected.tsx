import { useRef, useState } from "react";
import Button from "@/components/reusable/Button";
import leftArrow from "../../assets/icons/left-arrow.svg";
import excelToJson from "@/utils/excelToJson";

const SelectedTemplate = ({
  setSelectedPage,
  //@ts-ignore
  selectedTemplate,
  //@ts-ignore
  setExcelFileDetails,
}: {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  selectedTemplate: string;
  setExcelFileDetails: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Check if the selected file is an Excel file
    if (
      (file && file.type === "application/vnd.ms-excel") ||
      (file &&
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setSelectedFile(file);
      setSelectedPage("excel-sheet");
      excelToJson(file)
        .then((res) => {
          console.log(res);
          setExcelFileDetails(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Reset the file input if the file type is not supported
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
      alert("Only Excel files are supported.");
    }
  };

  const handleUploadButtonClick = () => {
    // Trigger click event of file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <button onClick={() => setSelectedPage("select-template")}>
        <img className="w-[44px]" src={leftArrow} alt="" />
      </button>
      <h1 className="text-text text-base font-work-sans font-semibold">
        Selected Template Preview
      </h1>

      <div className="flex items-center gap-8">
        <div className="rounded border-2 border-border border-dashed p-6 bg-[#FBFBFB] w-[50%] h-[376px] overflow-y-auto scrollbar-md flex flex-col gap-[10px]">
          <h1 className="text-text text-[14px] font-work-sans font-semibold">
            Template_Name
          </h1>
          {/* Render the uploaded Excel file using react-doc-viewer */}
          {selectedFile && <div></div>}
        </div>

        <div className="w-[50%] h-[376px] px-10 flex flex-col gap-6 border-l border-[#3F32CC]">
          <h1 className="text-text text-[14px] font-work-sans font-medium">
            Continue to upload the selected template for sending the email?
          </h1>

          <div className="flex items-center gap-6">
            <Button
              onClick={() => setSelectedPage("enter-details")}
              variant="secondary"
              className="text-primary text-base font-work-sans font-medium px-8 py-4"
            >
              Enter Details
            </Button>

            <Button
              variant="primary"
              className="text-white text-base font-work-sans font-medium px-8 py-4 border-primary border-[3px]"
              onClick={handleUploadButtonClick}
            >
              Upload
            </Button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedTemplate;
