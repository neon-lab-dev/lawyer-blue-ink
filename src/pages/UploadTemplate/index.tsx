import { useState } from "react";
import FileUploadSuccess from "./FileSucessful";
import FileDrop from "./FileUpload";
import Button from "@/components/reusable/Button";
import FilePreview from "./FileView";

// Main Component
const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showUploadArea, setShowUploadArea] = useState(true);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [templateName, setTemplateName] = useState('');

  // Explicit type annotation for 'files'
  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleProceed = () => {
    setShowUploadArea(false); // Hide the upload area
  };

  const handleSaveAndUpload = () => {
    setIsFileUploaded(true); // Simulate a successful upload
  };

  const pdfFile = uploadedFiles.find(file => file.type === 'application/pdf');
  return (
    <div className="p-3">
      {isFileUploaded ? (
        <FileUploadSuccess />
      ) : (
        <>
          {showUploadArea ? (
            <>
              <FileDrop onFilesUpload={handleFilesUpload} />
              <div className="flex justify-end w-[850px]">
                <Button onClick={handleProceed}>Proceed</Button>
              </div>
            </>
          ) : (
            pdfFile && (
              <FilePreview
                pdfFile={pdfFile}
                templateName={templateName}
                setTemplateName={setTemplateName}
                onSaveAndUpload={handleSaveAndUpload}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Home;
