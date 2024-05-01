import  { useEffect, useState, ChangeEvent } from "react";
import { renderAsync } from "docx-preview";
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import { Link } from "react-router-dom";

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
  const [_, setDocUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (docFile) {
      const fileUrl = URL.createObjectURL(docFile);
      setDocUrl(fileUrl);

      const el = document.getElementById("docx-preview");
      if (el) {
        renderAsync(docFile, el)
          .catch((err) => {
            console.error("Error rendering document:", err);
            setError("Error rendering document.");
          });
      } else {
        setError("Preview element not found.");
      }

      return () => {
        if (fileUrl) {
          URL.revokeObjectURL(fileUrl);
        }
      };
    } else {
      setError("No document file provided.");
    }
  }, [docFile]);

  return (
    <div className="scrollbar-thin">
      <div className="py-3 flex justify-between items-center">
        <Link to="/">
          <button onClick={onBack} className="rounded-full bg-gray-100 p-2">
            <img src={arrowleft} alt="Back" />
          </button>
        </Link>
        
      </div>
      <h1 className="font-bold text-2xl py-6">Preview Uploaded File</h1>
      {error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : (
        <div className="flex gap-10">
          <div className="p-4 h-[387px]  border border-dashed border-gray-600 overflow-auto">
            <h2>Preview</h2>
            <div id="docx-preview" style={{ height: "400px"}} className="hide-scrollbar" ></div>
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
                <Button onClick={onSaveAndUpload}>
                  Save and Upload
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