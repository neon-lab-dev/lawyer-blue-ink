import { useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "@/assets/images/cloud_upload.svg";

interface FileDropProps {
  onFilesUpload: (files: File[]) => void;
}

const FileDrop = ({ onFilesUpload }: FileDropProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      onFilesUpload(acceptedFiles);
    },
  });

  const dropzoneStyle = `
        border-2 
        border-dashed 
        rounded-md 
        p-4 
        transition-all 
        bg-[#FBFBFB] 
        border-[#C9C9C9] 
        ${isDragActive ? "bg-blue-100 border-blue-500" : ""}
        flex 
        flex-col 
        items-center 
        justify-center
        h-[300px]
        m-4
        w-[847px]
        cursor-pointer
    `;

  return (
    <div {...getRootProps()} className={dropzoneStyle}>
      <input {...getInputProps()} />
      <div className="text-center text-black">
        {uploadedFiles.length > 0 ? (
          <div>
            <h1 className="text-[18px] font-work-sans font-semibold mb-4">
              File Uploaded Successfully!
            </h1>
            <p>You have uploaded {uploadedFiles.length} file(s).</p>
          </div>
        ) : (
          <div>
            {isDragActive ? (
              <p>Drop Word files here...</p>
            ) : (
              <div>
                <h1 className="text-[18px] font-work-sans font-semibold mb-4">
                  Preview Upload File
                </h1>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-center">
                    <img src={uploadIcon} alt="Upload Icon" />
                  </div>
                  <p>Drag & drop Word files here, or click to upload.</p>
                  <span className="text-center text-[#0098EA] font-semibold text-[16px]">
                    Select a file
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDrop;
