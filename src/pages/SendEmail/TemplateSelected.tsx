import { useEffect, useRef, useState } from "react";
import Button from "@/components/reusable/Button";
import leftArrow from "../../assets/icons/left-arrow.svg";
import excelToJson from "@/utils/excelToJson";
import DocxPreview from "@/components/reusable/DocxPreview";
import { useNavigate } from "react-router-dom";
import { ITemplate } from "@/types/template.type";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setExcelData } from "@/store/slices/templates";

const SelectedTemplate = (): JSX.Element => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | null>();
  const { availableTemplates, selectedTemplateId } = useAppSelector(
    (state) => state.templates
  );
  //@ts-ignore
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
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
      excelToJson(file)
        .then((res) => {
          dispatch(setExcelData(res as Record<string, string>[]));
          navigate("/send-email/excel-sheet");
        })
        .catch(() => {
          toast.error("Error parsing the Excel file.");
        });
    } else {
      // Reset the file input if the file type is not supported
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
      toast.error("Please select a valid Excel file.");
    }
  };

  const handleUploadButtonClick = () => {
    // Trigger click event of file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (!selectedTemplateId) {
      navigate("/send-email");
    }
    const template = availableTemplates.find(
      (template) => template._id === selectedTemplateId
    );
    if (!template) {
      navigate("/send-email");
    }
    setSelectedTemplate(template);
  }, [availableTemplates, selectedTemplateId]);

  return (
    <div className="flex flex-col gap-6">
      <button onClick={() => navigate("/send-email")}>
        <img className="w-[44px]" src={leftArrow} alt="" />
      </button>
      <h1 className="text-text text-base font-work-sans font-semibold">
        Selected Template Preview
      </h1>

      <div className="flex items-center gap-8">
        <div className="rounded border-2 border-border border-dashed p-6 bg-[#FBFBFB] w-[50%] h-[376px] overflow-y-auto scrollbar-md flex flex-col gap-[10px]">
          <h1 className="text-text text-[14px] font-work-sans font-semibold">
            {selectedTemplate?.file_name}
          </h1>
          <DocxPreview selectedTemplate={selectedTemplate?.data} />
        </div>

        <div className="w-[50%] h-[376px] px-10 flex flex-col gap-6 border-l border-[#3F32CC]">
          <h1 className="text-text text-[14px] font-work-sans font-medium">
            Continue to upload the selected template for sending the email?
          </h1>

          <div className="flex items-center gap-6">
            <Button
              onClick={() => navigate("/send-email/enter-details")}
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
