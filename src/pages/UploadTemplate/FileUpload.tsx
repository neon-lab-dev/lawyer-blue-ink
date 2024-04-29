import { useDropzone } from 'react-dropzone';
import uploadIcon from "@/assets/images/cloud_upload.svg";

// Define the prop type for FileDrop
interface FileDropProps {
    onFilesUpload: (files: File[]) => void;
}

// FileDrop Component with TypeScript typings
const FileDrop = ({ onFilesUpload }: FileDropProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/msword': ['.doc'],  // Accepts .doc files
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],  // Accepts .docx files
        },
        onDrop: (acceptedFiles) => {
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
    ${isDragActive ? 'bg-blue-100 border-blue-500' : ''}
    flex 
    flex-col 
    items-center 
    justify-center
    h-[300px]
    m-4
    w-[847px]
  `;

    return (
        <div {...getRootProps()} className={dropzoneStyle}>
            <input {...getInputProps()} />
            <div className="text-center text-black">
                {isDragActive ? (
                    <p>Drop Word files here...</p>  // Changed the message for clarity
                ) : (
                    <div>
                        <h1 className="text-[18px] font-work-sans font-semibold mb-4">Preview Upload File</h1>
                        <div className='flex flex-col gap-6'>
                            <div className='flex justify-center'>
                                <img src={uploadIcon} alt="Upload Icon" />
                            </div>
                            <p>Drag & drop Word files here, or click to upload.</p>  // Updated text
                            <span className='text-center text-[#0098EA] font-semibold text-[16px]'>
                                Select a file
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileDrop;
