import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import Button from "@/components/reusable/Button";
import arrowleft from "@/assets/images/arrow_back.svg";
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface FilePreviewProps {
  docFile: File; 
  templateName: string;
  setTemplateName: (name: string) => void;
  onSaveAndUpload: () => void;
}

const FilePreview = ({ docFile, templateName, setTemplateName, onSaveAndUpload }: FilePreviewProps) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (docFile) {
      const fileUrl = URL.createObjectURL(docFile);
      setDocUrl(fileUrl);
      setLoading(false);
      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    } else {
      setError("No document file provided");
    }
  }, [docFile]);

  return (
    <div className="scrollbar-thin"> 
      <div className="py-6">
        <button className="rounded-[50%] bg-gray-100 p-2">
          <img src={arrowleft} alt="Back" />
        </button>
        <h1 className="pt-8 font-bold text-[16px]">Preview Uploaded File</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex gap-10">
          <div className="p-4 h-[387px] w-[500px] border-gray-600 border-dashed border">
            <h2>Preview</h2>
            <div className="h-[300px] w-[420px] p-4 m-4">
              {docUrl ? (
                <DocViewer
                  documents={[{ uri: docUrl }]} 
                  pluginRenderers={DocViewerRenderers}
                />
              ) : (
                <p>No file selected</p> 
              )}
            </div>
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
              <Link to="/filesuccesful">
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
