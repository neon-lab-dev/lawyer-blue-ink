import { useEffect, useState, ChangeEvent } from "react";
import { renderAsync } from "docx-preview";
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUploadTemplate } from "@/api/template";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

interface FilePreviewProps {
  docFile: File | null;
  templateName: string;
  setTemplateName: (name: string) => void;
  onSaveAndUpload: () => void;
  onBack: () => void;
}

const FilePreview = ({
  docFile,
  templateName,
  setTemplateName,
  onSaveAndUpload,
  onBack,
}: FilePreviewProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (docFile) {
      const el = document.getElementById("docx-preview");
      if (el) {
        renderAsync(docFile, el)
          .then(() => {
            const wrapper = el.querySelector(".docx-wrapper");
            if (wrapper) {
              wrapper.setAttribute(
                "style",
                "background: white;padding: 0;box-shadow: none;"
              );
              const docx = wrapper.querySelector(".docx");
              if (docx) {
                docx.setAttribute("style", "box-shadow: none;padding: 1rem;");
              }
            }
          })
          .catch((err) => {
            console.error("Error rendering document:", err);
            setError("Error rendering document.");
          });
      }
    } else {
      setError("No document file provided.");
    }
  }, [docFile]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUploadTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["templates"],
      });
      onSaveAndUpload();
      toast.success("Template uploaded successfully.");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return (
    <div className="scrollbar-thin overflow-hidden">
      <div className="py-3 flex justify-between items-center">
        <button onClick={onBack} className="rounded-full bg-gray-100 p-2">
          <img src={arrowleft} alt="Back" />
        </button>
      </div>
      <h1 className="font-bold text-2xl py-6">Preview Uploaded File</h1>
      {error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : (
        <div className="flex gap-10">
          <div className="p-4 h-[387px] border border-dashed border-gray-600 overflow-auto">
            <h2>Preview</h2>
            <div id="docx-preview" className="hide-scrollbar" />
          </div>
          <div className="border-l border-gray-400 px-10">
            <div className="flex flex-col gap-6">
              <span className="text-lg font-semibold">
                Set The Template Name
              </span>
              <input
                type="text"
                value={templateName}
                placeholder="Enter a File Name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTemplateName(e.target.value)
                }
                className="w-[360px] h-[16px] border border-gray-800 rounded-lg p-4"
              />
              <div className="flex justify-end">
                <Button
                  disabled={isPending || !templateName}
                  onClick={() => {
                    if (!docFile) toast.error("No document file provided.");
                    else
                      mutate({
                        file: docFile,
                        file_name: templateName,
                      });
                  }}
                >
                  {isPending ? (
                    <PulseLoader color="#cdcfd1" size={6} />
                  ) : (
                    "Save & Upload"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
