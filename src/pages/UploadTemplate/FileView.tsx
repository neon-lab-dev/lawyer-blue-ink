import { useEffect, useState, ChangeEvent } from "react";
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import { Link } from "react-router-dom";
import { renderAsync } from "docx-preview"; // Ensure this module is installed and type definitions are available


interface FilePreviewProps {
  docFile: File;
  templateName: string;
  setTemplateName: (name: string) => void;
  onSaveAndUpload: () => void;
}

const FilePreview = ({
  docFile,
  templateName,
  setTemplateName,
  onSaveAndUpload,
}: FilePreviewProps) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true); // Declared `isLoading` state with `setLoading`
  const [error, setError] = useState<string | null>(null); // Keep `error` for handling error scenarios

  useEffect(() => {
    if (docFile) {
      const fileUrl = URL.createObjectURL(docFile);
      setDocUrl(fileUrl);

      const el = document.getElementById("docx-preview");
      if (!el) {
        setError("docx: element not found");
      } else {
        renderAsync(docFile, el)
          .then((result: unknown) => {
            console.log("docx: finished", result);
            setLoading(false);
          })
          .catch((e: Error) => {
            setError(`Error rendering docx: ${e.message}`);
            setLoading(false);
          });
      }

      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    } else {
      setError("No document file provided");
    }
  }, [docFile]); // Dependency array should only contain docFile

  if (error) {
    return <div>Error: {error}</div>; // Handling the `error` case
  }

  return (
    <div className="scrollbar-thin">
      <div className="py-6">
        <Link to="/">
          <button className="rounded-[50%] bg-gray-100 p-2">
            <img src={arrowleft} alt="Back" />
          </button>
        </Link>
        <h1 className="pt-8 font-bold text-[16px]">Preview Uploaded File</h1>
      </div>

      <div className="flex gap-10">
        <div className="p-4 h-[387px] w-[500px] border-gray-600 border-dashed border">
          <h2>Preview</h2>
          {isLoading ? (
            <div>Loading...</div> // Show a loading indicator while rendering
          ) : (
            <div className="h-[300px] w-[420px] p-4 m-4">
              <div id="docx-preview"></div>
            </div>
          )}
        </div>

        <div className="border-l border-[#3F32CC99] px-10">
          <div className="flex flex-col gap-6">
            <span className="text-[16px] font-semibold">
              Set The Template Name
            </span>
            <input
              type="text"
              value={templateName}
              placeholder="Enter a File Name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTemplateName(e.target.value)
              }
              className="w-[360px] h-[16px] border-gray-800 border-5 rounded-lg p-6"
            />
            <div className="flex justify-end">
              <Link to="/filesuccesful">
                <Button onClick={onSaveAndUpload}>Save and Upload</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
