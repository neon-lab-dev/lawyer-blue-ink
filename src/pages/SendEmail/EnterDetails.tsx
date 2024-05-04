import React, { useEffect, useRef, useState } from "react"; // Explicitly import React and useRef
import { useForm } from "react-hook-form";
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import attach from "@/assets/images/attach_file.svg";
import extractVariablesFromDocx from "@/utils/extractVariablesFromDocx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import {
  addAttachedFiles,
  clearAttachedFiles,
  setExcelData,
} from "@/store/slices/templates";

const TrademarkForm = () => {
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { availableTemplates, selectedTemplateId, attachedFiles } =
    useAppSelector((state) => state.templates);
  const [vars, setVars] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Correct useRef type

  const onSubmit = (data: Record<string, any>) => {
    navigate("/send-email/excel-sheet");
    dispatch(
      setExcelData([
        {
          ...data,
        },
      ])
    );
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
    dispatch(
      addAttachedFiles({
        files: [...files],
        indexOfExcelSheet: 0,
      })
    );
  };

  useEffect(() => {
    (async () => {
      if (!selectedTemplateId) {
        navigate("/send-email");
        return;
      }
      const selectedTemplate = availableTemplates.find(
        (template) => template._id === selectedTemplateId
      );
      if (!selectedTemplate) {
        navigate("/send-email");
        return;
      }
      try {
        const vars = await extractVariablesFromDocx(selectedTemplate.data);
        const constantVars = [
          "CC EMAILS",
          "CLIENT WHATSAPP NO",
          "CLIENT EMAIL ID",
        ];
        const uniqueVars = [...new Set([...constantVars, ...vars])]; // Remove duplicates

        // Check for unsafe characters
        const unsafeVar = uniqueVars.find((variable) =>
          /[^a-zA-Z0-9 ]/.test(variable)
        );
        if (unsafeVar) {
          throw new Error(
            `Variable "${unsafeVar}" contains unsafe characters.`
          );
        }

        setVars(uniqueVars);
        console.log(uniqueVars);
      } catch (error) {
        setError({
          isError: true,
          message:
            String(error) +
            " Error extracting variables from the template, Check the placeholder variables in the template. Try adding the placeholder variables as mentioned.",
        });
      }
    })();
  }, []);

  return (
    <div className="mx-auto bg-white">
      <div className="pb-10 flex justify-between items-center">
        <button
          onClick={() => {
            navigate("/send-email/template-selected");
            dispatch(clearAttachedFiles());
          }}
          className="w-fit"
        >
          <img src={arrowleft} alt="Back" />
        </button>
      </div>

      {error.isError ? (
        <div
          className="bg-red-100 flex items-center max-w-4xl m-auto flex-col justify-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      ) : (
        <>
          <span className="font-work-sans text-[16px] font-semibold pt-6">
            Enter Details
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10 w-[998px] pt-6 m-1">
              {vars.map((variable, i) => (
                <div key={i} className="flex flex-col">
                  <input
                    type="text"
                    placeholder={variable.replace(/_/g, " ")}
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

              <Button
                type="button"
                variant="supportive"
                onClick={handleAttachFile}
              >
                <div className="flex gap-2 px-3 justify-center items-center">
                  <img src={attach} alt="Attach" />
                  <span className="font-work-sans">
                    {(() => {
                      let len = 0;
                      const files = attachedFiles?.find(
                        (file) => file.indexOfExcelSheet === 0
                      )?.files;

                      len = files ? files.length : 0;

                      return len === 0
                        ? "Attach Files"
                        : `${len} Files Attached`;
                    })()}
                  </span>
                </div>
              </Button>

              <Button type="submit">Proceed</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default TrademarkForm;
