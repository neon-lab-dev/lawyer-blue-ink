import { useState } from "react";
import FileUploadSuccess from "./FileSucessful";
import FileDrop from "./FileUpload";
import Button from "@/components/reusable/Button";
import FilePreview from "./FileView";

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showUploadArea, setShowUploadArea] = useState(true);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateSubject, setTemplateSubject] = useState("");

  const acceptableFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const handleFilesUpload = (files: File[]) => {
    console.log("Files uploaded:", files); // Debugging
    setUploadedFiles(files);
  };

  const handleProceed = () => {
    setShowUploadArea(false); // Hide the upload area
  };

  const handleSaveAndUpload = () => {
    setIsFileUploaded(true); // Simulate a successful upload
  };

  // Check if there's an acceptable document in the uploaded files
  const validFile = uploadedFiles.find((file) => {
    return acceptableFileTypes.includes(file.type);
  });

  return (
    <div className="p-3">
      {isFileUploaded ? (
        <FileUploadSuccess
          onBack={() => {
            setIsFileUploaded(false);
            setShowUploadArea(true);
          }}
        />
      ) : (
        <>
          {showUploadArea ? (
            <>
              <FileDrop onFilesUpload={handleFilesUpload} />

              <div className="flex justify-end w-[850px]">
                <Button
                  disabled={uploadedFiles.length === 0 || !validFile}
                  onClick={handleProceed}
                >
                  Proceed
                </Button>
              </div>
            </>
          ) : validFile ? (
            <FilePreview
              onBack={() => {
                setShowUploadArea(true);
                setUploadedFiles([]);
              }}
              docFile={validFile}
              templateName={templateName}
              setTemplateName={setTemplateName}
              onSaveAndUpload={handleSaveAndUpload}
              templateSubject={templateSubject}
              setTemplateSubject={setTemplateSubject}
            />
          ) : (
            <div className="text-red-600">
              No acceptable document file provided.
              <Button
                onClick={() => {
                  setShowUploadArea(true);
                  setUploadedFiles([]);
                }}
              >
                Go back
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
