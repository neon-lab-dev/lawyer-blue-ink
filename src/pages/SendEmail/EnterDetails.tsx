import React, { useEffect, useRef, useState } from "react"; // Explicitly import React and useRef
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import attach from "@/assets/images/attach_file.svg";
import extractVariablesFromDocx from "@/utils/extractVariablesFromDocx";

const TrademarkForm = ({
  selectedTemplate,
  setSelectedPage,
  setExcelFileDetails,
  attachedFiles,
  setAttachedFiles,
}: {
  selectedTemplate: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  setExcelFileDetails: React.Dispatch<any>;
  setAttachedFiles: React.Dispatch<any>;
  attachedFiles: File[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [vars, setVars] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Correct useRef type

  const onSubmit = (data: Record<string, any>) => {
    setExcelFileDetails([data]);
    setSelectedPage("excel-sheet");
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      // Check for null before calling click()
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = event.target.files;
    setAttachedFiles([...files]);
  };

  useEffect(() => {
    (async () => {
      const vars = await extractVariablesFromDocx(selectedTemplate);
      const constantVars = [
        "CC EMAILS",
        "CLIENT WHATSAPP NO",
        "CLIENT EMAIL ID",
      ];
      const uniqueVars = [...new Set([...constantVars, ...vars])]; // Remove duplicates
      setVars(uniqueVars);
      console.log(uniqueVars);
    })();
  }, [selectedTemplate]);

  return (
    <div className="mx-auto bg-white">
      <div className="pb-10 flex justify-between items-center">
        <button
          onClick={() => {
            setSelectedPage("template-selected");
            setAttachedFiles([]);
          }}
          className="w-fit"
        >
          <img src={arrowleft} alt="Back" />
        </button>
      </div>

      <span className="font-work-sans text-[16px] font-semibold pt-6">
        Enter Details
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10 w-[998px] pt-6 m-1">
          {vars.map((variable, i) => (
            <div key={i} className="flex flex-col">
              <input
                type="text"
                placeholder={variable}
                className="w-full border border-[#D0D0D0] p-4 rounded"
                {...register(variable, {
                  required: {
                    value: true,
                    message: `${variable} is required`,
                  },
                })}
              />

              <span className="text-rose-600 text-sm font-inter">
                {errors[variable]?.message as string | undefined}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4 justify-end w-[998px]">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden" // Hide the file input
            onChange={handleFileChange}
            multiple
          />

          <Button type="button" variant="supportive" onClick={handleAttachFile}>
            <div className="flex gap-2 px-3 justify-center items-center">
              <img src={attach} alt="Attach" />
              <span className="font-work-sans">
                {attachedFiles.length > 0
                  ? `${attachedFiles.length} files attached`
                  : "Attach Files"}
              </span>
            </div>
          </Button>

          <Button type="submit">Proceed</Button>
        </div>
      </form>
    </div>
  );
};

export default TrademarkForm;
