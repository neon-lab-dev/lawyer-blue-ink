import React, { useEffect, useRef, useState } from "react"; // Explicitly import React and useRef
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import attach from "@/assets/images/attach_file.svg";
import extractVariablesFromDocx from "@/utils/extractVariablesFromDocx";

const TrademarkForm = ({ selectedTemplate }: { selectedTemplate: string }) => {
  const { register, handleSubmit } = useForm();
  const [vars, setVars] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Correct useRef type

  const onSubmit = (data: Record<string, any>) => {
    console.log("Form submitted:", data);
    // Process form data
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      // Check for null before calling click()
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining
    if (file) {
      console.log("File attached:", file.name);
      // Process or store the file as needed
    }
  };

  useEffect(() => {
    (async () => {
      const vars = await extractVariablesFromDocx(selectedTemplate);
      const uniqueVars = [...new Set(vars)]; // Remove duplicates
      setVars(uniqueVars);
    })();
  }, [selectedTemplate]);

  return (
    <div className="mx-auto bg-white">
      <div className="pb-10 flex justify-between items-center">
        <Link to="/send-email">
          <img src={arrowleft} alt="Back" />
        </Link>
      </div>

      <span className="font-work-sans text-[16px] font-semibold pt-6">
        Enter Details
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10 w-[998px] pt-6 m-1">
          {vars.map((variable, i) => (
            <input
              key={i}
              type="text"
              placeholder={variable}
              className="w-full border border-[#D0D0D0] p-4 rounded"
              {...register(variable, {
                required: true,
              })}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-4 justify-end w-[998px]">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden" // Hide the file input
            onChange={handleFileChange}
          />

          <Button variant="supportive" onClick={handleAttachFile}>
            <div className="flex gap-2 px-3 justify-center items-center">
              <img src={attach} alt="Attach" />
              <span className="font-work-sans">Attach File</span>
            </div>
          </Button>

          <Button type="submit">Proceed</Button>
        </div>
      </form>
    </div>
  );
};

export default TrademarkForm;
