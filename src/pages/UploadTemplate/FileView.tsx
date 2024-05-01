import { useEffect, useState, ChangeEvent } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import { Link } from 'react-router-dom';

interface FilePreviewProps {
  docFile: File; 
  templateName: string;
  setTemplateName: (name: string) => void;
  onSaveAndUpload: () => void;
}

const FilePreview = ({ docFile, templateName, setTemplateName, onSaveAndUpload }: FilePreviewProps) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This useEffect runs only when docFile changes
  useEffect(() => {
    if (docFile) {
      try {
        const fileUrl = URL.createObjectURL(docFile);
        setDocUrl(fileUrl);
      } catch (e) {
        console.error("Error creating object URL:", e);
        setError("Failed to create document URL");
      }
    } else {
      setError("No document file provided");
    }

    // Cleanup object URL when component unmounts
    return () => {
      if (docUrl) {
        URL.revokeObjectURL(docUrl); // Ensure proper cleanup
      }
    };
  }, [docFile]); // Dependency array should only contain docFile

  return (
    <div className="scrollbar-thin"> 
      <div className="py-6">
        <Link to="/"> {/* Change to your correct path */}
          <button className="rounded-[50%] bg-gray-100 p-2">
            <img src={arrowleft} alt="Back" />
          </button>
        </Link>
        <h1 className="pt-8 font-bold text-[16px]">Preview Uploaded File</h1>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex gap-10">
          <div className="p-4 h-[387px] w-[500px] border-gray-600 border-dashed border">
            <h2>Preview</h2>
            {docUrl ? (
              <DocViewer
                documents={[{ uri: docUrl }]} 
                pluginRenderers={DocViewerRenderers}
              />
            ) : (
              <p>No file selected</p> 
            )}
          </div>
          <div className="border-l border-[#3F32CC99] px-10">
            <div className="flex flex-col gap-6">
              <span className="text-[16px] font-semibold">Set The Template Name</span>
              <input
                type="text"
                value={templateName}
                placeholder="Enter a File Name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
                className="w-[360px] h-[16px] border-gray-800 border-5 rounded-lg p-6"
              />
              <div className="flex justify-end">
                <Link to="/filesuccesful"> {/* Adjust path as needed */}
                  <Button onClick={onSaveAndUpload}>Save and Upload</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
